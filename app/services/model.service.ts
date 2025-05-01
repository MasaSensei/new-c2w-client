import axios from "axios";
import { type Model } from "~/types/model";

const API_URL = import.meta.env.VITE_API_URL;

export const ModelsService = {
  async getAll() {
    return axios.get(`${API_URL}/models`, {
      withCredentials: true,
    });
  },

  async create(data: Model) {
    return axios.post(`${API_URL}/models`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: Model) {
    return axios.put(`${API_URL}/models/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/models/${id}`, {
      withCredentials: true,
    });
  },
};
