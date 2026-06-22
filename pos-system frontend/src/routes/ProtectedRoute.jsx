import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import PageLoader from "../components/feedback/PageLoader.jsx";
import { useAuth } from "../hooks/useAuth.js";

export default function ProtectedRoute({
    allowedRoles,
}) {
    const {
        isAuthenticated,
        loading,
        role,
    } = useAuth();

    const location = useLocation();

    if (loading) {
        return <PageLoader />;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (
        allowedRoles?.length &&
        !allowedRoles.includes(role)
    ) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return <Outlet />;
}