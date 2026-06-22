import { Grid } from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BlockIcon from "@mui/icons-material/Block";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import StoreIcon from "@mui/icons-material/Store";

import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import DataTable from "../../components/data/DataTable.jsx";
import PageLoader from "../../components/feedback/PageLoader.jsx";

import { tableColumns } from "../crud/entityConfigs.jsx";
import { dashboardService } from "../../services/dashboardService.js";

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        dashboardService
            .getSuperAdminStats()
            .then(setStats)
            .catch(() =>
                setStats({
                    stores: [],
                    totalStores: 0,
                    activeStores: 0,
                    blockedStores: 0,
                    pendingRequests: 0,
                })
            );
    }, []);

    if (!stats) return <PageLoader />;

    return (
        <>
            <PageHeader
                title="Dashboard"
                subtitle="Overview of all stores and system statistics"
            />

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Total Stores"
                        value={stats.totalStores}
                        icon={StoreIcon}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Active Stores"
                        value={stats.activeStores}
                        icon={AccountBalanceIcon}
                        color="success"
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Blocked Stores"
                        value={stats.blockedStores}
                        icon={BlockIcon}
                        color="error"
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Pending Requests"
                        value={stats.pendingRequests}
                        icon={PendingActionsIcon}
                        color="warning"
                    />
                </Grid>

                <Grid item xs={12}>
                    <DataTable
                        rows={stats.stores}
                        columns={tableColumns.stores}
                    />
                </Grid>
            </Grid>
        </>
    );
}