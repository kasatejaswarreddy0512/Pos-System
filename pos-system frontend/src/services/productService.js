import apiClient from "../api/httpClient.js";

export const productService = {
  async getMyStoreProducts() {
    const response = await apiClient.get("/api/products/my-store");
    return response.data;
  },

  async getByStore(storeId) {
    if (!storeId) return [];

    const response = await apiClient.get(`/api/products/store/${storeId}`);

    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/products/${id}`);

    return response.data;
  },

  async search(storeId, keyword) {
    if (!storeId) return [];

    const response = await apiClient.get(
      `/api/products/store/${storeId}/search`,
      {
        params: { keyword },
      },
    );

    return response.data;
  },

  async create(payload) {
    const response = await apiClient.post("/api/products", payload);

    return response.data;
  },

  async update(id, payload) {
    const response = await apiClient.patch(`/api/products/${id}`, payload);

    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/products/${id}`);

    return response.data;
  },
};
