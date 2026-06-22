import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import FormTextField from "../../components/forms/FormTextField.jsx";

import { ROLES } from "../../constants/roles.js";
import { useAuth } from "../../hooks/useAuth.js";
import { signupSchema } from "../../validations/authValidation.js";

import videoBg from "../../assets/video.mp4";

export default function RegisterPage() {
    const { signup, error } = useAuth();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
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

            <Box sx={{ position: "relative", zIndex: 2, py: 5 }}>
                <Container maxWidth="sm">
                    <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
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

                            <Typography
                                variant="h4"
                                sx={{
                                    color: "#fff",
                                    fontWeight: 700,
                                }}
                            >
                                POS Pro
                            </Typography>
                        </Stack>

                        <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                            Create your POS account
                        </Typography>
                    </Stack>

                    <Card sx={{ boxShadow: 8, borderRadius: 3 }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            {error ? (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            ) : null}

                            <Formik
                                initialValues={{
                                    fullName: "",
                                    email: "",
                                    phone: "",
                                    password: "",
                                    role: ROLES.STORE_ADMIN,
                                }}
                                validationSchema={signupSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    try {
                                        const payload = {
                                            fullName: values.fullName,
                                            email: values.email,
                                            phone: values.phone,
                                            password: values.password,
                                            role: ROLES.STORE_ADMIN,
                                        };

                                        console.log("Signup Payload:", payload);

                                        await signup({
                                            payload,
                                            navigate,
                                        });
                                    } finally {
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Stack spacing={2.5}>
                                            <FormTextField
                                                name="fullName"
                                                label="Full Name"
                                            />

                                            <FormTextField
                                                name="email"
                                                label="Email"
                                            />

                                            <FormTextField
                                                name="phone"
                                                label="Phone"
                                            />

                                            <FormTextField
                                                name="password"
                                                label="Password"
                                                type="password"
                                            />

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting
                                                    ? "Creating..."
                                                    : "Create Account"}
                                            </Button>

                                            <Typography textAlign="center">
                                                Already have an account?{" "}
                                                <Link
                                                    to="/login"
                                                    style={{
                                                        color: "#1976d2",
                                                        textDecoration: "underline",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Sign in
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