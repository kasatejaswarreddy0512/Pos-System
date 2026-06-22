import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import PageHeader from "../../components/common/PageHeader.jsx";

export default function AlertsPage() {
    return (
        <>
            <PageHeader
                title="Alerts"
                subtitle="Inactive cashiers, low stock, no sales and refund spikes"
            />

            <Grid container spacing={3}>
                {[
                    "Inactive Cashiers",
                    "Low Stock Alerts",
                    "No Sale Today",
                    "Refund Spike",
                ].map((title) => (
                    <Grid
                        item
                        xs={12}
                        md={6}
                        key={title}
                    >
                        <Card
                            variant="outlined"
                            sx={{ minHeight: 220 }}
                        >
                            <CardContent>
                                <Typography variant="h5">
                                    {title}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 2 }}
                                >
                                    Alert data will be displayed here
                                    based on backend analytics.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}