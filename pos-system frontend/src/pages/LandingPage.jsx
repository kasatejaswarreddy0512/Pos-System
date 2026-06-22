import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import { Link } from "react-router-dom";
import { useColorMode } from "../contexts/ColorModeContext.jsx";

export default function LandingPage() {
    const { toggleMode } = useColorMode();

    const trusted = [
        "SuperMart",
        "Fresh Grocery",
        "City Mall",
        "Express Retail",
        "Metro Stores",
        "Quick Mart",
    ];

    const landingTextColor = "#1f2937";
    const landingSubTextColor = "#4b5563";

    return (
        <Box
            className="pos-gradient"
            sx={{
                minHeight: "100vh",
                color: landingTextColor,
            }}
        >
            <AppBar
                color="inherit"
                elevation={0}
                position="sticky"
                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ flexGrow: 1 }}
                        >
                            <Box
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "white",
                                    p: 1,
                                    borderRadius: 2,
                                }}
                            >
                                <PointOfSaleIcon />
                            </Box>

                            <Typography variant="h5">POS Pro</Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ display: { xs: "none", md: "flex" } }}
                        >
                            <Typography>Features</Typography>
                            <Typography>Pricing</Typography>
                            <Typography>Testimonials</Typography>
                            <Typography>Contact</Typography>
                        </Stack>

                        <IconButton onClick={toggleMode} sx={{ ml: 2 }}>
                            <WbSunnyIcon />
                        </IconButton>

                        <Button
                            component={Link}
                            to="/login"
                            variant="outlined"
                            sx={{ ml: 1 }}
                        >
                            Sign In
                        </Button>

                        <Button
                            component={Link}
                            to="/register"
                            variant="contained"
                            sx={{ ml: 1 }}
                        >
                            Request Demo
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container
                maxWidth="lg"
                sx={{
                    py: 8,
                    textAlign: "center",
                    color: landingSubTextColor,
                }}
            >
                <Stack spacing={2} alignItems="center">
                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        justifyContent="center"
                    >
                        <Chip
                            icon={<SpeedIcon />}
                            label="Fast Checkout"
                            sx={{ color: landingTextColor }}
                        />
                        <Chip
                            icon={<AssessmentIcon />}
                            label="Real-time Analytics"
                            sx={{ color: landingTextColor }}
                        />
                        <Chip
                            icon={<SecurityIcon />}
                            label="Secure Access"
                            sx={{ color: landingTextColor }}
                        />
                        <Chip
                            icon={<CheckCircleIcon />}
                            label="GST Ready"
                            sx={{ color: landingTextColor }}
                        />
                    </Stack>

                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            color: landingTextColor,
                        }}
                    >
                        Smart Multi-Tenant POS for Retail Stores
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            maxWidth: 760,
                            color: landingSubTextColor,
                        }}
                    >
                        Manage billing, inventory, branches, employees, refunds, and
                        sales reports from one responsive dashboard.
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        sx={{ pt: 2 }}
                    >
                        <Button
                            component={Link}
                            to="/register"
                            size="large"
                            variant="contained"
                        >
                            Get Started
                        </Button>

                        <Button
                            component={Link}
                            to="/login"
                            size="large"
                            variant="outlined"
                        >
                            Watch Demo Video
                        </Button>
                    </Stack>

                    <Grid container spacing={3} sx={{ pt: 5 }}>
                        {[
                            ["5,000+", "Active Users"],
                            ["₹100M+", "Monthly Sales"],
                            ["99.9%", "Uptime"],
                        ].map(([value, label]) => (
                            <Grid item xs={12} md={4} key={label}>
                                <Card sx={{ boxShadow: 5 }}>
                                    <CardContent>
                                        <Typography variant="h3">
                                            {value}
                                        </Typography>

                                        <Typography color="text.secondary">
                                            {label}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>

                <Box sx={{ mt: 10 }}>
                    <Typography
                        variant="h4"
                        sx={{ color: landingTextColor }}
                    >
                        Trusted by leading retailers across India
                    </Typography>

                    <Typography
                        sx={{
                            mb: 4,
                            color: landingSubTextColor,
                        }}
                    >
                        Join thousands of successful businesses using our POS system
                    </Typography>

                    <Grid container spacing={3}>
                        {trusted.map((name) => (
                            <Grid item xs={12} sm={6} md={4} key={name}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6">
                                            {name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}