import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const TailoringInventoryService = {
  async create(data: any) {
    return axios.post(`${API_URL}/tailoring-inventories`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getAll() {
    return axios.get(`${API_URL}/tailoring-inventories`, {});
  },
};

export default TailoringInventoryService;
