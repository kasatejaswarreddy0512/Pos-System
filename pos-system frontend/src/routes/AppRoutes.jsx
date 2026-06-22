import { createBrowserRouter, Navigate } from "react-router-dom";

import AppShell from "../components/layout/AppShell.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import { ROLES } from "../constants/roles.js";

import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";

import InventoryPage from "../pages/branch/InventoryPage.jsx";
import OrdersPage from "../pages/branch/OrdersPage.jsx";
import RefundsPage from "../pages/branch/RefundsPage.jsx";
import ShiftReportsPage from "../pages/branch/ShiftReportsPage.jsx";

import NotFoundPage from "../pages/common/NotFoundPage.jsx";
import PlaceholderPage from "../pages/common/PlaceholderPage.jsx";
import UnauthorizedPage from "../pages/common/UnauthorizedPage.jsx";

import AlertsPage from "../pages/dashboard/AlertsPage.jsx";
import BranchDashboard from "../pages/dashboard/BranchDashboard.jsx";
import SalesPage from "../pages/dashboard/SalesPage.jsx";
import StoreDashboard from "../pages/dashboard/StoreDashboard.jsx";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard.jsx";

import OrderHistoryPage from "../pages/pos/OrderHistoryPage.jsx";
import POSTerminalPage from "../pages/pos/POSTerminalPage.jsx";
import ReturnRefundPage from "../pages/pos/ReturnRefundPage.jsx";
import ShiftSummaryPage from "../pages/pos/ShiftSummaryPage.jsx";

import BranchesPage from "../pages/store/BranchesPage.jsx";
import CategoriesPage from "../pages/store/CategoriesPage.jsx";
import CustomersPage from "../pages/store/CustomersPage.jsx";
import EmployeesPage from "../pages/store/EmployeesPage.jsx";
import ProductsPage from "../pages/store/ProductsPage.jsx";
import StoresPage from "../pages/store/StoresPage.jsx";

import SettingsPage from "../pages/settings/SettingsPage.jsx";

const storeRoles = [
    ROLES.STORE_ADMIN,
    ROLES.STORE_MANAGER,
];

const branchRoles = [
    ROLES.BRANCH_MANAGER,
];

const cashierRoles = [
    ROLES.BRANCH_CASHIER,
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
    },

    {
        element: (
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />
        ),
        children: [
            {
                path: "/super-admin",
                element: (
                    <AppShell title="Super Admin Panel" />
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate
                                to="/super-admin/dashboard"
                                replace
                            />
                        ),
                    },
                    {
                        path: "dashboard",
                        element: <SuperAdminDashboard />,
                    },
                    {
                        path: "stores",
                        element: <StoresPage />,
                    },
                    {
                        path: "plans",
                        element: (
                            <PlaceholderPage title="Subscription Plans" />
                        ),
                    },
                    {
                        path: "pending-requests",
                        element: <StoresPage />,
                    },
                    {
                        path: "exports",
                        element: (
                            <PlaceholderPage title="Exports" />
                        ),
                    },
                ],
            },
        ],
    },

    {
        element: (
            <ProtectedRoute allowedRoles={storeRoles} />
        ),
        children: [
            {
                path: "/store",
                element: <AppShell title="POS Admin" />,
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate
                                to="/store/dashboard"
                                replace
                            />
                        ),
                    },
                    {
                        path: "dashboard",
                        element: <StoreDashboard />,
                    },
                    {
                        path: "profile",
                        element: <StoresPage />,
                    },
                    {
                        path: "branches",
                        element: <BranchesPage />,
                    },
                    {
                        path: "products",
                        element: <ProductsPage />,
                    },
                    {
                        path: "categories",
                        element: <CategoriesPage />,
                    },
                    {
                        path: "employees",
                        element: <EmployeesPage />,
                    },
                    {
                        path: "alerts",
                        element: <AlertsPage />,
                    },
                    {
                        path: "sales",
                        element: <SalesPage />,
                    },
                    {
                        path: "transactions",
                        element: <OrdersPage />,
                    },
                    {
                        path: "reports",
                        element: <ShiftReportsPage />,
                    },
                    {
                        path: "upgrade-plan",
                        element: (
                            <PlaceholderPage title="Upgrade Plan" />
                        ),
                    },
                ],
            },
        ],
    },

    {
        element: (
            <ProtectedRoute allowedRoles={branchRoles} />
        ),
        children: [
            {
                path: "/branch",
                element: <AppShell title="Branch Manager" />,
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate
                                to="/branch/dashboard"
                                replace
                            />
                        ),
                    },
                    {
                        path: "dashboard",
                        element: <BranchDashboard />,
                    },
                    {
                        path: "orders",
                        element: <OrdersPage />,
                    },
                    {
                        path: "refunds",
                        element: <RefundsPage />,
                    },
                    {
                        path: "transactions",
                        element: <OrdersPage />,
                    },
                    {
                        path: "inventory",
                        element: <InventoryPage />,
                    },
                    {
                        path: "employees",
                        element: (
                            <EmployeesPage scope="branch" />
                        ),
                    },
                    {
                        path: "customers",
                        element: <CustomersPage />,
                    },
                    {
                        path: "reports",
                        element: <ShiftReportsPage />,
                    },
                ],
            },
        ],
    },

    {
        element: (
            <ProtectedRoute allowedRoles={cashierRoles} />
        ),
        children: [
            {
                path: "/cashier",
                element: (
                    <AppShell title="POS Terminal" />
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate
                                to="/cashier/pos"
                                replace
                            />
                        ),
                    },
                    {
                        path: "pos",
                        element: <POSTerminalPage />,
                    },
                    {
                        path: "orders",
                        element: <OrderHistoryPage />,
                    },
                    {
                        path: "refunds",
                        element: <ReturnRefundPage />,
                    },
                    {
                        path: "customers",
                        element: <CustomersPage />,
                    },
                    {
                        path: "shift-summary",
                        element: <ShiftSummaryPage />,
                    },
                ],
            },
        ],
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/settings",
                element: <AppShell title="Settings" />,
                children: [
                    {
                        index: true,
                        element: <SettingsPage />,
                    },
                ],
            },
        ],
    },

    {
        path: "*",
        element: <NotFoundPage />,
    },
]);