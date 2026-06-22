import apiClient from "../api/httpClient.js";

export const customerService = {
  async getAll() {
    const response = await apiClient.get("/api/customer");
    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/customer/${id}`);
    return response.data;
  },

  async search(q) {
    const response = await apiClient.get("/api/customer/search", {
      params: { q },
    });

    return response.data;
  },

  async create(payload) {
    const response = await apiClient.post("/api/customer", payload);

    return response.data;
  },

  async update(id, payload) {
    const response = await apiClient.put(`/api/customer/${id}`, payload);

    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/customer/${id}`);

    return response.data;
  },
};
