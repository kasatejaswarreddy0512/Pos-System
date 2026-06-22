import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AppStateProvider } from "./contexts/AppStateContext.jsx";
import {
    ColorModeProvider,
    useColorMode,
} from "./contexts/ColorModeContext.jsx";

import { router } from "./routes/AppRoutes.jsx";

function AppContent() {
    const { theme } = useColorMode();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <AuthProvider>
                <AppStateProvider>
                    <RouterProvider router={router} />
                </AppStateProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default function App() {
    return (
        <ColorModeProvider>
            <AppContent />
        </ColorModeProvider>
    );
}