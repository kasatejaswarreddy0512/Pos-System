import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { authService } from "../services/authService.js";

import {
    getToken,
    removeAuthStorage,
    setToken,
} from "../utils/storage.js";

import { getApiErrorMessage } from "../utils/error.js";
import { getHomePathByRole } from "../utils/routeByRole.js";

export const AuthContext = createContext(null);

const extractToken = (response) =>
    response?.jwtToken || response?.jwt || response?.token;

export function AuthProvider({ children }) {
    const [jwt, setJwt] = useState(getToken());
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProfile = useCallback(async () => {
        const token = getToken();

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const profile = await authService.profile();
            setUser(profile);
        } catch (error) {
            console.error("Profile Load Error:", error);

            removeAuthStorage();
            setJwt(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const login = useCallback(async ({ email, password, navigate }) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.login({
                email,
                password,
            });

            const token = extractToken(response);

            if (token) {
                setToken(token);
                setJwt(token);
            }

            if (response?.user) {
                setUser(response.user);
            }

            navigate(getHomePathByRole(response?.user?.role), {
                replace: true,
            });

            return response;
        } catch (error) {
            console.error("Login Error:", error);
            setError(getApiErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const signup = useCallback(async ({ payload, navigate }) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.signup(payload);

            const token = extractToken(response);

            if (token) {
                setToken(token);
                setJwt(token);
            }

            if (response?.user) {
                setUser(response.user);
            }

            navigate(getHomePathByRole(response?.user?.role), {
                replace: true,
            });

            return response;
        } catch (error) {
            console.error("Signup Error:", error);
            setError(getApiErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback((navigate) => {
        removeAuthStorage();

        setJwt(null);
        setUser(null);

        navigate?.("/login", {
            replace: true,
        });
    }, []);

    const value = useMemo(
        () => ({
            user,
            jwt,
            role: user?.role,
            loading,
            error,
            isAuthenticated: !!jwt,
            login,
            signup,
            logout,
            refreshProfile: loadProfile,
        }),
        [
            user,
            jwt,
            loading,
            error,
            login,
            signup,
            logout,
            loadProfile,
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}