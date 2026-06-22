import { ROLES } from "../constants/roles.js";
export const getHomePathByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return "/super-admin/dashboard";
    case ROLES.STORE_ADMIN:
    case ROLES.STORE_MANAGER:
      return "/store/dashboard";
    case ROLES.BRANCH_MANAGER:
      return "/branch/dashboard";
    case ROLES.BRANCH_CASHIER:
      return "/cashier/pos";
    default:
      return "/";
  }
};
