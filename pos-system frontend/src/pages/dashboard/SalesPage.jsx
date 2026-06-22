import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/People";

import { formatCurrency } from "../../utils/formatters.js";

function SmallStatCard({
    title,
    value,
    icon: Icon,
    color = "primary",
}) {
    return (
        <Card
            variant="outlined"
            sx={{
                height: "100%",
                borderRadius: 3,
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1.5}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 13,
                                color: "text.secondary",
                                fontWeight: 600,
                                mb: 0.8,
                            }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 800,
                                lineHeight: 1.2,
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>

                    {Icon ? (
                        <Avatar
                            sx={{
                                bgcolor: `${color}.light`,
                                color: `${color}.main`,
                                width: 46,
                                height: 46,
                            }}
                        >
                            <Icon sx={{ fontSize: 22 }} />
                        </Avatar>
                    ) : null}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function SalesPage() {
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
                    Sales Management
                </Typography>

                <Typography
                    sx={{
                        fontSize: 14,
                        color: "text.secondary",
                        mt: 0.5,
                    }}
                >
                    Sales analytics and payment method breakdown
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <SmallStatCard
                        title="Total Sales"
                        value={formatCurrency(86181)}
                        icon={AssessmentIcon}
                        color="primary"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <SmallStatCard
                        title="Orders Today"
                        value="0"
                        icon={LocalMallIcon}
                        color="info"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <SmallStatCard
                        title="Active Cashiers"
                        value="0"
                        icon={PeopleIcon}
                        color="secondary"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <SmallStatCard
                        title="Avg. Order Value"
                        value={formatCurrency(0)}
                        icon={PaymentIcon}
                        color="success"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            minHeight: 150,
                        }}
                    >
                        <CardContent sx={{ p: 2.5 }}>
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 800,
                                    mb: 1,
                                }}
                            >
                                Daily Sales (Last 7 Days)
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "text.secondary",
                                }}
                            >
                                Chart placeholder ready for backend sales endpoint.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            minHeight: 150,
                        }}
                    >
                        <CardContent sx={{ p: 2.5 }}>
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 800,
                                    mb: 1,
                                }}
                            >
                                Payment Methods
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "text.secondary",
                                }}
                            >
                                Payment data appears here.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}