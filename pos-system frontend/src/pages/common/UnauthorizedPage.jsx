import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
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
                <Typography variant="h2">
                    Unauthorized
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    You do not have permission to access this page.
                </Typography>

                <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                >
                    Login Again
                </Button>
            </Box>
        </Box>
    );
}