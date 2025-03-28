import axios from "axios";
import { type Code } from "~/types/code";

const API_URL = import.meta.env.VITE_API_URL;

export const CodesService = {
  async getAll() {
    return axios.get(`${API_URL}/codes`);
  },

  async create(data: Code) {
    return axios.post(`${API_URL}/codes`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: Code) {
    return axios.put(`${API_URL}/codes/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/codes/${id}`);
  },
};
