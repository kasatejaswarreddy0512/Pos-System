import { storeService } from "./storeService.js";
import { branchService } from "./branchService.js";
import { productService } from "./productService.js";
import { employeeService } from "./employeeService.js";
import { orderService } from "./orderService.js";
import { refundService } from "./refundService.js";

export const dashboardService = {
  async getSuperAdminStats() {
    const stores = await storeService.getAll();

    return {
      totalStores: stores.length,
      activeStores: stores.filter((store) => store.status === "ACTIVE").length,
      blockedStores: stores.filter((store) => store.status === "BLOCKED")
        .length,
      pendingRequests: stores.filter((store) => store.status === "PENDING")
        .length,
      stores,
    };
  },

  async getStoreStats(storeId) {
    const [products, branches, employees] = await Promise.all([
      storeId
        ? productService.getByStore(storeId)
        : productService.getMyStoreProducts(),

      storeId
        ? branchService.getByStore(storeId)
        : branchService.getMyStoreBranches(),

      storeId
        ? employeeService.getByStore(storeId)
        : employeeService.getMyStoreEmployees(),
    ]);

    return {
      products,
      branches,
      employees,
      totalProducts: products.length,
      totalBranches: branches.length,
      totalEmployees: employees.length,
    };
  },

  async getBranchStats(branchId) {
    const [orders, refunds] = await Promise.all([
      orderService.getTodayByBranch(branchId),
      refundService.getByBranch(branchId),
    ]);

    const todaySales = orders.reduce(
      (sum, order) => sum + Number(order.totalAmount || 0),
      0,
    );

    const totalRefunds = refunds.reduce(
      (sum, refund) => sum + Number(refund.amount || 0),
      0,
    );

    return {
      orders,
      refunds,
      todaySales,
      totalRefunds,
      ordersToday: orders.length,
    };
  },
};
