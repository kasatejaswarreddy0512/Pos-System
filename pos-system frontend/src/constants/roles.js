export const ROLES = {
  USER: "ROLE_USER",
  ADMIN: "ROLE_ADMIN",
  BRANCH_CASHIER: "ROLE_BRANCH_CASHIER",
  BRANCH_MANAGER: "ROLE_BRANCH_MANAGER",
  STORE_MANAGER: "ROLE_STORE_MANAGER",
  STORE_ADMIN: "ROLE_STORE_ADMIN",
};

export const ROLE_LABELS = {
  ROLE_USER: "User",
  ROLE_ADMIN: "Super Admin",
  ROLE_BRANCH_CASHIER: "Cashier",
  ROLE_BRANCH_MANAGER: "Branch Manager",
  ROLE_STORE_MANAGER: "Store Manager",
  ROLE_STORE_ADMIN: "Store Admin",
};

export const STORE_ROLES = [ROLES.STORE_ADMIN, ROLES.STORE_MANAGER];

export const BRANCH_ROLES = [ROLES.BRANCH_MANAGER, ROLES.BRANCH_CASHIER];

export const PAYMENT_TYPES = ["CASH", "CARD", "UPI"];

export const ORDER_STATUS = ["PENDING", "COMPLETED", "CANCELLED", "REFUNDED"];

export const STORE_STATUS = ["PENDING", "ACTIVE", "LOCKED", "REJECTED"];

export const REFUND_REASONS = [
  "Customer changed mind",
  "Wrong item",
  "Damaged product",
  "Billing mistake",
  "Other",
];
