import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const StaggingTailorService = {
  async getAll(status?: string[]) {
    const params: any = {};

    if (status && status.length > 0) {
      params.status = status.join(",");
    }

    return axios.get(`${API_URL}/stagging-to-tailors`, {
      params,
      withCredentials: true,
    });
  },

  async create(data: any[]) {
    return axios.post(`${API_URL}/stagging-to-tailors`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  },
};
