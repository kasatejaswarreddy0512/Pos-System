import apiClient from "../api/httpClient.js";

export const refundService = {
  async create(payload) {
    const response = await apiClient.post("/api/refund", payload);
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get("/api/refund");
    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/refund/${id}`);
    return response.data;
  },

  async getByBranch(branchId) {
    if (!branchId) return [];

    const response = await apiClient.get(`/api/refund/branch/${branchId}`);

    return response.data;
  },

  async getByCashier(cashierId) {
    if (!cashierId) return [];

    const response = await apiClient.get(`/api/refund/cashier/${cashierId}`);

    return response.data;
  },

  async getByShift(shiftReportId) {
    const response = await apiClient.get(`/api/refund/shift/${shiftReportId}`);

    return response.data;
  },

  async getByCashierRange(cashierId, startDate, endDate) {
    const response = await apiClient.get(
      `/api/refund/cashier/${cashierId}/range`,
      {
        params: { startDate, endDate },
      },
    );

    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/refund/${id}`);

    return response.data;
  },
};
