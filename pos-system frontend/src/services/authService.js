import apiClient from "../api/httpClient.js";

export const authService = {
  login: async (payload) => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  signup: async (payload) => {
    const response = await apiClient.post("/auth/signup", payload);
    return response.data;
  },

  profile: async () => {
    const response = await apiClient.get("/api/user/profile");
    return response.data;
  },
};
