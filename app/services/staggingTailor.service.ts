import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const StaggingTailorService = {
  async getAll() {
    return axios.get(`${API_URL}/stagging-to-tailors`, {});
  },

  async create(data: any[]) {
    return axios.post(`${API_URL}/stagging-to-tailors`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
