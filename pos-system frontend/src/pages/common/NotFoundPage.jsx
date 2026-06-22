import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                p: 3,
            }}
        >
            <Box>
                <Typography variant="h1">
                    404
                </Typography>

                <Typography
                    variant="h5"
                    sx={{ mb: 3 }}
                >
                    Page not found
                </Typography>

                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                >
                    Go Home
                </Button>
            </Box>
        </Box>
    );
}