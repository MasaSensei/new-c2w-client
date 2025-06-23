import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const CuttingInventoryService = {
  async create(data: any) {
    return axios.post(`${API_URL}/cutting-inventories`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getAll() {
    return axios.get(`${API_URL}/cutting-inventories`, {});
  },

  async get(id: number) {
    return axios.get(`${API_URL}/cutting-inventories/${id}`, {});
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/cutting-inventories/${id}`, {});
  },
};
