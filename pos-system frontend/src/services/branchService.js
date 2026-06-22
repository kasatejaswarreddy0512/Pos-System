import apiClient from "../api/httpClient.js";

const toNumberId = (id) => {
  if (id === null || id === undefined || id === "") {
    return null;
  }

  const num = Number(id);
  return Number.isNaN(num) ? null : num;
};

export const branchService = {
  async getMyStoreBranches() {
    const response = await apiClient.get("/api/branch/my-store");
    return response.data;
  },

  async getByStore(storeId) {
    const finalStoreId = toNumberId(storeId);

    if (!finalStoreId) {
      return [];
    }

    const response = await apiClient.get(`/api/branch/store/${finalStoreId}`);
    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/branch/${id}`);
    return response.data;
  },

  async create(payload) {
    const response = await apiClient.post("/api/branch", payload);
    return response.data;
  },

  async update(id, payload) {
    const response = await apiClient.put(`/api/branch/${id}`, payload);
    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/branch/${id}`);
    return response.data;
  },
};
