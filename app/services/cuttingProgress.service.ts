import axios from "axios";
import { type CuttingProgress } from "~/types/cuttingProgress";

const API_URL = import.meta.env.VITE_API_URL;

export const CuttingProgressService = {
  async getAll() {
    return axios.get(`${API_URL}/cutting-progress`, {});
  },

  async create(data: CuttingProgress) {
    return axios.post(`${API_URL}/cutting-progress`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};

export default CuttingProgressService;
