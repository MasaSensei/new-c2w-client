import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const WorkerPriceService = {
  async create(data: any) {
    return axios.post(`${API_URL}/workers-prices`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
