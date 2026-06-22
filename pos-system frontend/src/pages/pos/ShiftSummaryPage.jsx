import {
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
    GlobalStyles,
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import LogoutIcon from "@mui/icons-material/Logout";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader.jsx";
import PageLoader from "../../components/feedback/PageLoader.jsx";

import { shiftReportService } from "../../services/shiftReportService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";

import {
    formatCurrency,
    formatDateTime,
} from "../../utils/formatters.js";

const ACTIVE_SHIFT_KEY = "activeShift";

export default function ShiftSummaryPage() {
    const navigate = useNavigate();

    const { logout } = useAuth();
    const { notify } = useAppState();

    const [shift, setShift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const saveActiveShift = (data) => {
        if (data && !data.shiftEnd) {
            localStorage.setItem(ACTIVE_SHIFT_KEY, JSON.stringify(data));
        }
    };

    const removeActiveShift = () => {
        localStorage.removeItem(ACTIVE_SHIFT_KEY);
    };

    const loadCachedShift = () => {
        const cached = localStorage.getItem(ACTIVE_SHIFT_KEY);

        if (!cached) return null;

        try {
            const parsed = JSON.parse(cached);

            if (parsed && !parsed.shiftEnd) {
                return parsed;
            }

            removeActiveShift();
            return null;
        } catch {
            removeActiveShift();
            return null;
        }
    };

    const loadCurrentShift = async () => {
        try {
            setLoading(true);

            const cachedShift = loadCachedShift();

            if (cachedShift) {
                setShift(cachedShift);
            }

            const data = await shiftReportService.getCurrent();

            if (data && !data.shiftEnd) {
                setShift(data);
                saveActiveShift(data);
            } else {
                setShift(null);
                removeActiveShift();
            }
        } catch (error) {
            console.error("Current Shift Error:", error);

            const status = error?.response?.status;

            if (status === 404 || status === 400) {
                setShift(null);
                removeActiveShift();
            } else {
                const cachedShift = loadCachedShift();

                if (cachedShift) {
                    setShift(cachedShift);
                } else {
                    setShift(null);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCurrentShift();
    }, []);

    const handleStartShift = async () => {
        try {
            setActionLoading(true);

            const data = await shiftReportService.startShift();

            setShift(data);
            saveActiveShift(data);

            notify("Shift started successfully", "success");
        } catch (error) {
            console.error("Start Shift Error:", error);

            notify(
                error?.response?.data?.message || "Unable to start shift",
                "error"
            );

            await loadCurrentShift();
        } finally {
            setActionLoading(false);
        }
    };

    const handleEndShiftAndLogout = async () => {
        try {
            setActionLoading(true);

            const data = await shiftReportService.endShift();

            setShift(data);
            removeActiveShift();

            notify("Shift ended successfully", "success");

            if (logout) {
                logout();
            } else {
                localStorage.clear();
                navigate("/login");
            }
        } catch (error) {
            console.error("End Shift Error:", error);

            notify(
                error?.response?.data?.message || "Unable to end shift",
                "error"
            );
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <PageLoader />;

    const hasActiveShift = shift && !shift.shiftEnd;

    return (
        <>
            <GlobalStyles
                styles={{
                    "@media print": {
                        "body *": {
                            visibility: "hidden",
                        },
                        "#shift-print-area": {
                            display: "block !important",
                            visibility: "visible",
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            padding: "24px",
                            background: "#fff",
                            color: "#000",
                        },
                        "#shift-print-area *": {
                            visibility: "visible",
                        },
                        ".no-print": {
                            display: "none !important",
                        },
                    },
                }}
            />

            <div className="no-print">
                <PageHeader title="Shift Summary">
                    {hasActiveShift && (
                        <>
                            <Button
                                startIcon={<PrintIcon />}
                                variant="outlined"
                                onClick={() => window.print()}
                            >
                                Print Summary
                            </Button>

                            <Button
                                startIcon={<LogoutIcon />}
                                color="error"
                                variant="contained"
                                disabled={actionLoading}
                                onClick={handleEndShiftAndLogout}
                            >
                                End Shift & Logout
                            </Button>
                        </>
                    )}
                </PageHeader>

                {!hasActiveShift ? (
                    <Card variant="outlined">
                        <CardContent>
                            <Stack
                                spacing={2}
                                alignItems="center"
                                justifyContent="center"
                                sx={{ minHeight: 300 }}
                            >
                                <Typography variant="h5" fontWeight={800}>
                                    No Active Shift
                                </Typography>

                                <Typography color="text.secondary">
                                    Please start your shift before processing sales.
                                </Typography>

                                <Button
                                    startIcon={<PlayArrowIcon />}
                                    variant="contained"
                                    disabled={actionLoading}
                                    onClick={handleStartShift}
                                >
                                    Start Shift
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" sx={{ mb: 3 }}>
                                        Shift Information
                                    </Typography>

                                    <Stack spacing={1}>
                                        <Typography>
                                            Cashier:{" "}
                                            <strong>{shift.cashier?.fullName || "-"}</strong>
                                        </Typography>

                                        <Typography>
                                            Shift Start:{" "}
                                            <strong>
                                                {shift.shiftStart
                                                    ? formatDateTime(shift.shiftStart)
                                                    : "-"}
                                            </strong>
                                        </Typography>

                                        <Typography>
                                            Shift End:{" "}
                                            <strong>
                                                {shift.shiftEnd
                                                    ? formatDateTime(shift.shiftEnd)
                                                    : "Ongoing"}
                                            </strong>
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" sx={{ mb: 3 }}>
                                        Sales Summary
                                    </Typography>

                                    <Stack spacing={1}>
                                        <Typography>
                                            Total Orders: <strong>{shift.totalOrders || 0}</strong>
                                        </Typography>

                                        <Typography>
                                            Total Sales:{" "}
                                            <strong>{formatCurrency(shift.totalSales || 0)}</strong>
                                        </Typography>

                                        <Typography color="error">
                                            Total Refunds:{" "}
                                            <strong>{formatCurrency(shift.totalRefunds || 0)}</strong>
                                        </Typography>

                                        <Typography>
                                            Net Sales:{" "}
                                            <strong>{formatCurrency(shift.netSales || 0)}</strong>
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5">Payment Summary</Typography>

                                    {(shift.paymentSummaries || []).length === 0 ? (
                                        <Typography sx={{ mt: 2 }} color="text.secondary">
                                            No payment data available
                                        </Typography>
                                    ) : (
                                        (shift.paymentSummaries || []).map((p) => (
                                            <Stack
                                                key={p.paymentType}
                                                direction="row"
                                                justifyContent="space-between"
                                                sx={{ mt: 2 }}
                                            >
                                                <Typography>
                                                    {p.paymentType}
                                                    <br />
                                                    <small>{p.transactionCount || 0} transactions</small>
                                                </Typography>

                                                <Typography textAlign="right">
                                                    {formatCurrency(p.totalAmount || 0)}
                                                    <br />
                                                    <small>{Number(p.percentage || 0).toFixed(2)}%</small>
                                                </Typography>
                                            </Stack>
                                        ))
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5">Top Selling Items</Typography>

                                    {(shift.topSellingProducts || []).length === 0 ? (
                                        <Typography sx={{ mt: 2 }} color="text.secondary">
                                            No items sold yet
                                        </Typography>
                                    ) : (
                                        (shift.topSellingProducts || []).map((product, index) => (
                                            <Stack
                                                key={product.id || index}
                                                direction="row"
                                                justifyContent="space-between"
                                                sx={{ mt: 2 }}
                                            >
                                                <Typography>
                                                    {index + 1}. {product.name}
                                                </Typography>

                                                <Typography>
                                                    {formatCurrency(product.sellingPrice || 0)}
                                                </Typography>
                                            </Stack>
                                        ))
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </div>

            {hasActiveShift && (
                <div id="shift-print-area" style={{ display: "none" }}>
                    <h1>Shift Summary</h1>

                    <hr />

                    <h2>Shift Information</h2>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    Cashier
                                </td>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    {shift.cashier?.fullName || "-"}
                                </td>
                            </tr>

                            <tr>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    Shift Start
                                </td>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    {shift.shiftStart ? formatDateTime(shift.shiftStart) : "-"}
                                </td>
                            </tr>

                            <tr>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    Shift End
                                </td>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    {shift.shiftEnd ? formatDateTime(shift.shiftEnd) : "Ongoing"}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Sales Summary</h2>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    Total Orders
                                </td>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    {shift.totalOrders || 0}
                                </td>
                            </tr>

                            <tr>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    Total Sales
                                </td>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    {formatCurrency(shift.totalSales || 0)}
                                </td>
                            </tr>

                            <tr>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    Total Refunds
                                </td>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    {formatCurrency(shift.totalRefunds || 0)}
                                </td>
                            </tr>

                            <tr>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    Net Sales
                                </td>
                                <td style={{ padding: 8, border: "1px solid #000" }}>
                                    {formatCurrency(shift.netSales || 0)}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Payment Summary</h2>

                    {(shift.paymentSummaries || []).length === 0 ? (
                        <p>No payment data available</p>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: 8, border: "1px solid #000" }}>
                                        Payment Type
                                    </th>
                                    <th style={{ padding: 8, border: "1px solid #000" }}>
                                        Transactions
                                    </th>
                                    <th style={{ padding: 8, border: "1px solid #000" }}>
                                        Amount
                                    </th>
                                    <th style={{ padding: 8, border: "1px solid #000" }}>
                                        Percentage
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {(shift.paymentSummaries || []).map((p) => (
                                    <tr key={p.paymentType}>
                                        <td style={{ padding: 8, border: "1px solid #000" }}>
                                            {p.paymentType}
                                        </td>
                                        <td style={{ padding: 8, border: "1px solid #000" }}>
                                            {p.transactionCount || 0}
                                        </td>
                                        <td style={{ padding: 8, border: "1px solid #000" }}>
                                            {formatCurrency(p.totalAmount || 0)}
                                        </td>
                                        <td style={{ padding: 8, border: "1px solid #000" }}>
                                            {Number(p.percentage || 0).toFixed(2)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <h2>Top Selling Items</h2>

                    {(shift.topSellingProducts || []).length === 0 ? (
                        <p>No items sold yet</p>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: 8, border: "1px solid #000" }}>#</th>
                                    <th style={{ padding: 8, border: "1px solid #000" }}>
                                        Product
                                    </th>
                                    <th style={{ padding: 8, border: "1px solid #000" }}>
                                        Price
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {(shift.topSellingProducts || []).map((product, index) => (
                                    <tr key={product.id || index}>
                                        <td style={{ padding: 8, border: "1px solid #000" }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ padding: 8, border: "1px solid #000" }}>
                                            {product.name}
                                        </td>
                                        <td style={{ padding: 8, border: "1px solid #000" }}>
                                            {formatCurrency(product.sellingPrice || 0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <p style={{ marginTop: 32 }}>
                        Printed At: {formatDateTime(new Date())}
                    </p>
                </div>
            )}
        </>
    );
}