import apiClient from "../api/httpClient.js";

export const shiftReportService = {
  async startShift() {
    const response = await apiClient.post("/api/shift-report/start");
    return response.data;
  },

  async endShift() {
    const response = await apiClient.patch("/api/shift-report/end");
    return response.data;
  },

  async getCurrent() {
    const response = await apiClient.get("/api/shift-report/current");
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get("/api/shift-report");
    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/shift-report/${id}`);
    return response.data;
  },

  async getByBranch(branchId) {
    if (!branchId) return [];

    const response = await apiClient.get(
      `/api/shift-report/branch/${branchId}`,
    );

    return response.data;
  },

  async getByCashier(cashierId) {
    if (!cashierId) return [];

    const response = await apiClient.get(
      `/api/shift-report/cashier/${cashierId}`,
    );

    return response.data;
  },

  async getByCashierAndDate(cashierId, date) {
    const response = await apiClient.get(
      `/api/shift-report/cashier/${cashierId}/by-date`,
      { params: { date } },
    );

    return response.data;
  },
};
