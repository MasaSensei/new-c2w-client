import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const TailoringProgressService = {
  async getAll() {
    return axios.get(`${API_URL}/tailoring-progress`, {
      withCredentials: true,
    });
  },

  async create(data: any) {
    return axios.post(`${API_URL}/tailoring-progress`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },
};

export default TailoringProgressService;
