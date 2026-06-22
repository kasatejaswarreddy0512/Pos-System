import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";

import { useEffect, useState } from "react";

import PageLoader from "../../components/feedback/PageLoader.jsx";
import StatCard from "../../components/common/StatCard.jsx";

import { dashboardService } from "../../services/dashboardService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";

export default function StoreDashboard() {
    const { user } = useAuth();
    const { selectedStoreId } = useAppState();

    const storeId =
        selectedStoreId ||
        user?.store?.id ||
        user?.storeId;

    const [stats, setStats] = useState(null);

    useEffect(() => {
        dashboardService
            .getStoreStats(storeId)
            .then((data) => {
                console.log("Store Dashboard Stats:", data);

                setStats({
                    totalProducts: data?.totalProducts ?? 0,
                    totalBranches: data?.totalBranches ?? 0,
                    totalEmployees: data?.totalEmployees ?? 0,
                });
            })
            .catch((error) => {
                console.error("Store dashboard error:", error);

                setStats({
                    totalProducts: 0,
                    totalBranches: 0,
                    totalEmployees: 0,
                });
            });
    }, [storeId]);

    if (!stats) return <PageLoader />;

    return (
        <>
            <Box sx={{ mb: 3 }}>
                <Typography
                    sx={{
                        fontSize: 28,
                        fontWeight: 800,
                        lineHeight: 1.2,
                    }}
                >
                    Store Dashboard
                </Typography>

                <Typography
                    sx={{
                        fontSize: 14,
                        color: "text.secondary",
                        mt: 0.5,
                    }}
                >
                    Products, branches and employee summary
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Total Products"
                        value={stats.totalProducts}
                        icon={InventoryIcon}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Total Branches"
                        value={stats.totalBranches}
                        icon={StoreIcon}
                        color="success"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Total Employees"
                        value={stats.totalEmployees}
                        icon={PeopleIcon}
                        color="secondary"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 800,
                                }}
                            >
                                Daily Sales
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "text.secondary",
                                    mt: 1,
                                }}
                            >
                                Connect analytics API to show last 7 days chart.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 800,
                                }}
                            >
                                Payment Methods
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "text.secondary",
                                    mt: 1,
                                }}
                            >
                                Payment summary appears after orders are created.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}