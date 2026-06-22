import apiClient from "../api/httpClient.js";

export const orderService = {
  async create(payload) {
    const response = await apiClient.post("/api/order", payload);
    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/order/${id}`);
    return response.data;
  },

  async getMyStoreOrders(filters = {}) {
    const response = await apiClient.get("/api/order/my-store", {
      params: filters,
    });

    return response.data;
  },

  async getByStore(storeId, filters = {}) {
    if (!storeId) return [];

    const response = await apiClient.get(`/api/order/store/${storeId}`, {
      params: filters,
    });

    return response.data;
  },

  async getByBranch(branchId, filters = {}) {
    if (!branchId) return [];

    const response = await apiClient.get(`/api/order/branch/${branchId}`, {
      params: filters,
    });

    return response.data;
  },

  async getTodayByBranch(branchId) {
    if (!branchId) return [];

    const response = await apiClient.get(`/api/order/today/${branchId}`);

    return response.data;
  },

  async getTop5ByBranch(branchId) {
    if (!branchId) return [];

    const response = await apiClient.get(`/api/order/top5order/${branchId}`);

    return response.data;
  },

  async getByCashier(cashierId) {
    if (!cashierId) return [];

    const response = await apiClient.get(`/api/order/cashier/${cashierId}`);

    return response.data;
  },

  async getByCustomer(customerId) {
    const response = await apiClient.get(`/api/order/customer/${customerId}`);

    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/order/${id}`);

    return response.data;
  },
};
