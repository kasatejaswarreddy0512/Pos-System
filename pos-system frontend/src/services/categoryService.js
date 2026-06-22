import apiClient from "../api/httpClient.js";

const toNumberId = (id) => {
  if (id === null || id === undefined || id === "") {
    return null;
  }

  const num = Number(id);
  return Number.isNaN(num) ? null : num;
};

export const categoryService = {
  async getMyStoreCategories() {
    const response = await apiClient.get("/api/category/my-store");
    return response.data;
  },

  async getByStore(storeId) {
    const finalStoreId = toNumberId(storeId);

    if (!finalStoreId) {
      return [];
    }

    const response = await apiClient.get(`/api/category/store/${finalStoreId}`);

    return response.data;
  },

  async create(payload) {
    const response = await apiClient.post("/api/category", payload);
    return response.data;
  },

  async update(id, payload) {
    const response = await apiClient.put(`/api/category/${id}`, payload);
    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/category/${id}`);
    return response.data;
  },
};
