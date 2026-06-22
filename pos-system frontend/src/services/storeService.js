import apiClient from "../api/httpClient.js";

export const storeService = {
  async getAll() {
    const response = await apiClient.get("/api/store");
    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/store/${id}`);
    return response.data;
  },

  async getByAdmin() {
    const response = await apiClient.get("/api/store/admin");
    return response.data;
  },

  async getByEmployee() {
    const response = await apiClient.get("/api/store/employee");
    return response.data;
  },

  async create(payload) {
    const response = await apiClient.post("/api/store", payload);
    return response.data;
  },

  async update(id, payload) {
    const response = await apiClient.put(`/api/store/${id}`, payload);
    return response.data;
  },

  async moderate(id, storeStatus) {
    const response = await apiClient.put(`/api/store/${id}/moderate`, null, {
      params: { storeStatus },
    });

    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/store/${id}`);
    return response.data;
  },
};
