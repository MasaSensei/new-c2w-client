import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const TailorsInventoryService = {
  getAll() {
    return axios.get(`${API_URL}/tailors-inventories`, {});
  },

  async create(data: any) {
    return axios.post(`${API_URL}/tailors-inventories`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
