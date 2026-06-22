import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReplayIcon from "@mui/icons-material/Replay";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DownloadIcon from "@mui/icons-material/Download";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import { ROLES } from "./roles.js";

export const MENU_BY_ROLE = {
  [ROLES.ADMIN]: [
    { label: "Dashboard", path: "/super-admin/dashboard", icon: DashboardIcon },
    { label: "Stores", path: "/super-admin/stores", icon: StoreIcon },
    {
      label: "Subscription Plans",
      path: "/super-admin/plans",
      icon: WorkspacePremiumIcon,
    },
    {
      label: "Pending Requests",
      path: "/super-admin/pending-requests",
      icon: PendingActionsIcon,
    },
    { label: "Exports", path: "/super-admin/exports", icon: DownloadIcon },
    { label: "Settings", path: "/settings", icon: SettingsIcon },
  ],

  [ROLES.STORE_ADMIN]: [
    { label: "Dashboard", path: "/store/dashboard", icon: DashboardIcon },
    { label: "Stores", path: "/store/profile", icon: StoreIcon },
    { label: "Branches", path: "/store/branches", icon: AccountTreeIcon },
    { label: "Products", path: "/store/products", icon: ShoppingCartIcon },
    { label: "Categories", path: "/store/categories", icon: CategoryIcon },
    { label: "Employees", path: "/store/employees", icon: PeopleIcon },
    { label: "Alerts", path: "/store/alerts", icon: LocalShippingIcon },
    { label: "Sales", path: "/store/sales", icon: AssessmentIcon },
    {
      label: "Transactions",
      path: "/store/transactions",
      icon: ReceiptLongIcon,
    },
    { label: "Reports", path: "/store/reports", icon: AssessmentIcon },
    {
      label: "Upgrade Plan",
      path: "/store/upgrade-plan",
      icon: WorkspacePremiumIcon,
    },
    { label: "Settings", path: "/settings", icon: SettingsIcon },
  ],

  [ROLES.STORE_MANAGER]: [
    { label: "Dashboard", path: "/store/dashboard", icon: DashboardIcon },
    { label: "Branches", path: "/store/branches", icon: AccountTreeIcon },
    { label: "Products", path: "/store/products", icon: ShoppingCartIcon },
    { label: "Categories", path: "/store/categories", icon: CategoryIcon },
    { label: "Employees", path: "/store/employees", icon: PeopleIcon },
    { label: "Sales", path: "/store/sales", icon: AssessmentIcon },
    { label: "Reports", path: "/store/reports", icon: AssessmentIcon },
    { label: "Settings", path: "/settings", icon: SettingsIcon },
  ],

  [ROLES.BRANCH_MANAGER]: [
    { label: "Dashboard", path: "/branch/dashboard", icon: DashboardIcon },
    { label: "Orders", path: "/branch/orders", icon: ReceiptLongIcon },
    { label: "Refunds", path: "/branch/refunds", icon: ReplayIcon },
    {
      label: "Transactions",
      path: "/branch/transactions",
      icon: ReceiptLongIcon,
    },
    { label: "Inventory", path: "/branch/inventory", icon: InventoryIcon },
    { label: "Employees", path: "/branch/employees", icon: PeopleIcon },
    { label: "Customers", path: "/branch/customers", icon: PeopleIcon },
    { label: "Reports", path: "/branch/reports", icon: AssessmentIcon },
    { label: "Settings", path: "/settings", icon: SettingsIcon },
  ],

  [ROLES.BRANCH_CASHIER]: [
    { label: "POS Terminal", path: "/cashier/pos", icon: PointOfSaleIcon },
    { label: "Order History", path: "/cashier/orders", icon: ReceiptLongIcon },
    { label: "Returns/Refunds", path: "/cashier/refunds", icon: ReplayIcon },
    { label: "Customers", path: "/cashier/customers", icon: PeopleIcon },
    {
      label: "Shift Summary",
      path: "/cashier/shift-summary",
      icon: AssessmentIcon,
    },
  ],
};

export const DEFAULT_MENU = MENU_BY_ROLE[ROLES.STORE_ADMIN];
