import apiClient from "../api/httpClient.js";

const toNumberId = (id) => {
  if (id === null || id === undefined || id === "") {
    return null;
  }

  const num = Number(id);
  return Number.isNaN(num) ? null : num;
};

export const employeeService = {
  async getMyStoreEmployees(role) {
    const response = await apiClient.get("/api/employee/my-store", {
      params: role ? { role } : {},
    });

    return response.data;
  },

  async getByStore(storeId, role) {
    const finalStoreId = toNumberId(storeId);

    if (!finalStoreId) {
      return [];
    }

    const response = await apiClient.get(
      `/api/employee/store/${finalStoreId}`,
      {
        params: role ? { role } : {},
      },
    );

    return response.data;
  },

  async getByBranch(branchId, role) {
    const finalBranchId = toNumberId(branchId);

    if (!finalBranchId) {
      return [];
    }

    const response = await apiClient.get(
      `/api/employee/branch/${finalBranchId}`,
      {
        params: role ? { role } : {},
      },
    );

    return response.data;
  },

  async createForStore(storeId, payload) {
    const finalStoreId = toNumberId(storeId);

    if (!finalStoreId) {
      throw new Error("Store ID is required to create employee");
    }

    const response = await apiClient.post(
      `/api/employee/store/${finalStoreId}`,
      payload,
    );

    return response.data;
  },

  async createForBranch(branchId, payload) {
    const finalBranchId = toNumberId(branchId);

    if (!finalBranchId) {
      throw new Error("Branch ID is required to create employee");
    }

    const response = await apiClient.post(
      `/api/employee/branch/${finalBranchId}`,
      payload,
    );

    return response.data;
  },

  async update(id, payload) {
    const response = await apiClient.put(`/api/employee/${id}`, payload);
    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`/api/employee/${id}`);
    return response.data;
  },
};
