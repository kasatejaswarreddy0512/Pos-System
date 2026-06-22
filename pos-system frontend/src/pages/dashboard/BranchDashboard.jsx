import {
    Box,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";

import LocalMallIcon from "@mui/icons-material/LocalMall";
import PeopleIcon from "@mui/icons-material/People";
import ReplayIcon from "@mui/icons-material/Replay";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useEffect, useState } from "react";

import PageLoader from "../../components/feedback/PageLoader.jsx";

import { dashboardService } from "../../services/dashboardService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";
import { formatCurrency } from "../../utils/formatters.js";

function SmallStatCard({
    title,
    value,
    helper,
    icon: Icon,
    color = "primary",
}) {
    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                minHeight: 135,
            }}
        >
            <CardContent sx={{ p: 2.3 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 14,
                                color: "text.secondary",
                                fontWeight: 600,
                                mb: 1,
                            }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 28,
                                fontWeight: 800,
                                lineHeight: 1.2,
                            }}
                        >
                            {value}
                        </Typography>

                        {helper ? (
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: "success.main",
                                    mt: 1,
                                    fontWeight: 600,
                                }}
                            >
                                {helper}
                            </Typography>
                        ) : null}
                    </Box>

                    <Box
                        sx={{
                            width: 54,
                            height: 54,
                            borderRadius: "50%",
                            bgcolor: `${color}.main`,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Icon sx={{ fontSize: 26 }} />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function BranchDashboard() {
    const { user } = useAuth();
    const { selectedBranchId } = useAppState();

    const branchId =
        selectedBranchId ||
        user?.branch?.id ||
        user?.branchId;

    const [stats, setStats] = useState(null);

    useEffect(() => {
        console.log("Logged in user:", user);
        console.log("Selected branch id:", selectedBranchId);
        console.log("Final branch id:", branchId);

        if (!branchId) {
            setStats({
                todaySales: 0,
                totalRefunds: 0,
                ordersToday: 0,
            });
            return;
        }

        dashboardService
            .getBranchStats(branchId)
            .then((data) => {
                console.log("Branch dashboard stats:", data);
                setStats(data);
            })
            .catch((error) => {
                console.error("Branch stats error:", error);

                setStats({
                    todaySales: 0,
                    totalRefunds: 0,
                    ordersToday: 0,
                });
            });
    }, [branchId, selectedBranchId, user]);

    if (!stats) return <PageLoader />;

    const branchName =
        user?.branch?.name ||
        user?.branchName ||
        stats?.branch?.name ||
        stats?.branchName ||
        (branchId ? `Branch ID: ${branchId}` : "Branch overview");

    const paymentData = [
        { label: "CARD", value: 51 },
        { label: "UPI", value: 49 },
        { label: "CASH", value: 30 },
    ];

    return (
        <>
            <Box sx={{ mb: 3 }}>
                <Typography
                    sx={{
                        fontSize: 30,
                        fontWeight: 800,
                        lineHeight: 1.2,
                    }}
                >
                    Branch Dashboard
                </Typography>

                <Typography
                    sx={{
                        fontSize: 15,
                        color: "text.secondary",
                        mt: 0.5,
                    }}
                >
                    {branchName}
                </Typography>
            </Box>

            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                    <SmallStatCard
                        title="Today's Sales"
                        value={formatCurrency(stats.todaySales || 0)}
                        helper="+0% from yesterday"
                        icon={ShoppingBagIcon}
                        color="primary"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <SmallStatCard
                        title="Orders Today"
                        value={stats.ordersToday || 0}
                        icon={LocalMallIcon}
                        color="info"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <SmallStatCard
                        title="Active Cashiers"
                        value="1"
                        icon={PeopleIcon}
                        color="secondary"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <SmallStatCard
                        title="Refunds"
                        value={formatCurrency(stats.totalRefunds || 0)}
                        icon={ReplayIcon}
                        color="error"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Card
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ p: 2.5 }}>
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 800,
                                    mb: 2.5,
                                }}
                            >
                                Payment Breakdown
                            </Typography>

                            <Stack spacing={2}>
                                {paymentData.map((item) => (
                                    <Stack
                                        key={item.label}
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Typography
                                            sx={{
                                                width: 70,
                                                fontSize: 14,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {item.label}
                                        </Typography>

                                        <LinearProgress
                                            variant="determinate"
                                            value={item.value}
                                            sx={{
                                                flexGrow: 1,
                                                height: 8,
                                                borderRadius: 5,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                width: 42,
                                                fontSize: 14,
                                                fontWeight: 700,
                                                textAlign: "right",
                                            }}
                                        >
                                            {item.value}%
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}