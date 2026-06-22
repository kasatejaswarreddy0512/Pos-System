import apiClient from "../api/httpClient.js";

export const userService = {
  async profile() {
    const response = await apiClient.get("/api/user/profile");
    return response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/api/user/${id}`);
    return response.data;
  },
};
