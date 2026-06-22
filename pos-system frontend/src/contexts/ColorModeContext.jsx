import { createContext, useContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

const ColorModeContext = createContext(null);

const tokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: mode === "dark" ? "#ff174f" : "#014737",
            contrastText: "#fff",
        },
        secondary: {
            main: "#ff174f",
        },
        success: {
            main: "#00a86b",
        },
        background: {
            default: mode === "dark" ? "#101114" : "#f7f9fb",
            paper: mode === "dark" ? "#18191d" : "#fff",
        },
    },

    shape: {
        borderRadius: 14,
    },

    typography: {
        fontFamily: "Inter,Roboto,Arial,sans-serif",
        h4: { fontWeight: 800 },
        h5: { fontWeight: 800 },
        h6: { fontWeight: 800 },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 700,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 18,
                },
            },
        },
    },
});

export function ColorModeProvider({ children }) {
    const [mode, setMode] = useState(
        localStorage.getItem("pos_theme") || "light"
    );

    const toggleMode = () => {
        setMode((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("pos_theme", next);
            return next;
        });
    };

    const theme = useMemo(() => createTheme(tokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={{ mode, theme, toggleMode }}>
            {children}
        </ColorModeContext.Provider>
    );
}

export const useColorMode = () => useContext(ColorModeContext);