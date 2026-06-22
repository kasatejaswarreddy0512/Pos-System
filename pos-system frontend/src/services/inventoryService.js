import apiClient from "../api/httpClient.js";

export const inventoryService = {
  async getByBranch(branchId) {
    if (!branchId) return [];

    const response = await apiClient.get(`/api/inventory/branch/${branchId}`);

    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/inventory/${id}`);

    return response.data;
  },

  async getByProductAndBranch(productId, branchId) {
    const response = await apiClient.get(
      `/api/inventory/product/${productId}/branch/${branchId}`,
    );

    return response.data;
  },

  async create(payload) {
    const response = await apiClient.post("/api/inventory", payload);

    return response.data;
  },

  async update(id, payload) {
    const response = await apiClient.put(`/api/inventory/${id}`, payload);

    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/inventory/${id}`);

    return response.data;
  },
};
