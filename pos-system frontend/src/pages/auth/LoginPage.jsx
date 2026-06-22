import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormTextField from "../../components/forms/FormTextField.jsx";
import { useColorMode } from "../../contexts/ColorModeContext.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { loginSchema } from "../../validations/authValidation.js";
import videoBg from "../../assets/video.mp4";

export default function LoginPage() {
    const { login, error } = useAuth();
    const nav = useNavigate();

    const [show, setShow] = useState(false);
    const { toggleMode } = useColorMode();

    return (
        <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

            {/* ✅ Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                }}
            >
                <source src={videoBg} type="video/mp4" />
            </video>

            {/* ✅ Dark Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.65)",
                    zIndex: 1,
                }}
            />

            {/* ✅ Content Layer */}
            <Box sx={{ position: "relative", zIndex: 2, py: 4 }}>

                {/* Theme toggle */}
                <IconButton
                    onClick={toggleMode}
                    sx={{
                        position: "fixed",
                        right: 24,
                        top: 24,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    }}
                >
                    <WbSunnyIcon />
                </IconButton>

                <Container maxWidth="sm">

                    {/* Header */}
                    <Stack alignItems="center" spacing={2} sx={{ mb: 4, pt: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
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

                            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>
                                POS Pro
                            </Typography>
                        </Stack>

                        <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>
                            Welcome Back
                        </Typography>

                        <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                            Sign in to your account to continue
                        </Typography>
                    </Stack>

                    {/* Login Card */}
                    <Card sx={{ boxShadow: 8, borderRadius: 3 }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>

                            {error ? (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            ) : null}

                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                                validationSchema={loginSchema}
                                onSubmit={(values, { setSubmitting }) =>
                                    login({
                                        ...values,
                                        navigate: nav,
                                    }).finally(() => setSubmitting(false))
                                }
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Stack spacing={3}>

                                            <FormTextField
                                                name="email"
                                                label="Email Address"
                                                placeholder="Enter your email"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <MailOutlineIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <FormTextField
                                                name="password"
                                                label="Password"
                                                type={show ? "text" : "password"}
                                                placeholder="Enter your password"
                                                sx={{
                                                    "& input[type=password]::-ms-reveal": {
                                                        display: "none",
                                                    },
                                                    "& input[type=password]::-ms-clear": {
                                                        display: "none",
                                                    },
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => setShow((p) => !p)} edge="end">
                                                                {show ? (
                                                                    <VisibilityOffIcon />
                                                                ) : (
                                                                    <VisibilityIcon />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <Stack direction="row" justifyContent="space-between">
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label="Remember me"
                                                />

                                                <Typography
                                                    color="primary"
                                                    fontWeight={700}
                                                    sx={{ cursor: "pointer" }}
                                                >
                                                    Forgot password?
                                                </Typography>
                                            </Stack>

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting
                                                    ? "Signing in..."
                                                    : "Sign In"}
                                            </Button>

                                            <Typography textAlign="center">
                                                New store owner?{" "}
                                                <Link
                                                    to="/register"
                                                    style={{
                                                        color: "#1976d2",
                                                        textDecoration: "underline",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Create account
                                                </Link>
                                            </Typography>

                                        </Stack>
                                    </Form>
                                )}
                            </Formik>

                        </CardContent>
                    </Card>

                </Container>
            </Box>
        </Box>
    );
}