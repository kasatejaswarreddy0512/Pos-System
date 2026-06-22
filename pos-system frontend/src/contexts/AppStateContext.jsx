import { createContext, useMemo, useState } from "react";

export const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
    const [selectedStoreId, setStoreId] = useState("");
    const [selectedBranchId, setBranchId] = useState("");

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const notify = (message, severity = "success") =>
        setSnackbar({
            open: true,
            message,
            severity,
        });

    const closeSnackbar = () =>
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));

    const value = useMemo(
        () => ({
            selectedStoreId,
            setStoreId,
            selectedBranchId,
            setBranchId,
            snackbar,
            notify,
            closeSnackbar,
        }),
        [
            selectedStoreId,
            selectedBranchId,
            snackbar,
        ]
    );

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
}