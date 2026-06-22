import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader.jsx";

import {
    PAYMENT_TYPES,
    REFUND_REASONS,
} from "../../constants/roles.js";

import { orderService } from "../../services/orderService.js";
import { refundService } from "../../services/refundService.js";

import { useAppState } from "../../hooks/useAppState.js";
import { useAuth } from "../../hooks/useAuth.js";

import {
    formatCurrency,
    formatDateTime,
} from "../../utils/formatters.js";

export default function ReturnRefundPage() {
    const { user } = useAuth();
    const { selectedBranchId, notify } =
        useAppState();

    const branchId =
        selectedBranchId ||
        user?.branch?.id ||
        user?.branchId;

    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [reason, setReason] = useState("");
    const [paymentType, setPaymentType] =
        useState("CASH");

    useEffect(() => {
        orderService
            .getByBranch(branchId)
            .then(setOrders)
            .catch(() => setOrders([]));
    }, [branchId]);

    const selected = orders.find(
        (o) =>
            String(o.id) === String(orderId)
    );

    const submit = async () => {
        if (!selected || !reason) {
            notify(
                "Select order and return reason",
                "warning"
            );
            return;
        }

        try {
            await refundService.create({
                orderId: selected.id,
                reason,
                paymentType,
                amount: selected.totalAmount,
                cashierId: user?.id,
                branchId,
            });

            notify("Refund processed successfully");

            setOrderId("");
            setReason("");
        } catch {
            notify(
                "Unable to process refund. Please verify RefundDto fields.",
                "error"
            );
        }
    };

    return (
        <>
            <PageHeader
                title="Return / Refund"
                subtitle="Search an order and process refund"
            />

            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <Card variant="outlined">
                        <CardContent>
                            <TextField
                                select
                                label="Select Order"
                                fullWidth
                                value={orderId}
                                onChange={(e) =>
                                    setOrderId(e.target.value)
                                }
                            >
                                {orders.map((o) => (
                                    <MenuItem
                                        value={o.id}
                                        key={o.id}
                                    >
                                        Order #{o.id} -{" "}
                                        {formatCurrency(
                                            o.totalAmount
                                        )}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {selected ? (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h5">
                                        Order {selected.id}
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {formatDateTime(
                                            selected.createdAt
                                        )}
                                    </Typography>

                                    <Typography sx={{ mt: 2 }}>
                                        Customer:{" "}
                                        {selected.customer
                                            ?.fullName || "-"}
                                    </Typography>

                                    <Typography>
                                        Total Items:{" "}
                                        {selected.items?.length ||
                                            0}
                                    </Typography>

                                    <Typography variant="h6">
                                        Order Total:{" "}
                                        {formatCurrency(
                                            selected.totalAmount
                                        )}
                                    </Typography>
                                </Box>
                            ) : null}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={3}>
                                <TextField
                                    select
                                    label="Return Reason"
                                    value={reason}
                                    onChange={(e) =>
                                        setReason(e.target.value)
                                    }
                                >
                                    {REFUND_REASONS.map((i) => (
                                        <MenuItem
                                            key={i}
                                            value={i}
                                        >
                                            {i}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Refund Method"
                                    value={paymentType}
                                    onChange={(e) =>
                                        setPaymentType(
                                            e.target.value
                                        )
                                    }
                                >
                                    {PAYMENT_TYPES.map((i) => (
                                        <MenuItem
                                            key={i}
                                            value={i}
                                        >
                                            {i}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="h6">
                                        Total Refund Amount:
                                    </Typography>

                                    <Typography variant="h6">
                                        {formatCurrency(
                                            selected?.totalAmount
                                        )}
                                    </Typography>
                                </Stack>

                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={submit}
                                >
                                    Process Refund
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}