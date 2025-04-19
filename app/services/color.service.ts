import axios from "axios";
import { type Color } from "~/types/color";

const API_URL = import.meta.env.VITE_API_URL;

export const ColorsService = {
  async getAll() {
    return axios.get(`${API_URL}/colors`, {
      withCredentials: true,
    });
  },

  async create(data: Color) {
    return axios.post(`${API_URL}/colors`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: Color) {
    return axios.put(`${API_URL}/colors/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/colors/${id}`, {
      withCredentials: true,
    });
  },

  async get(id: number) {
    return axios.get(`${API_URL}/colors/${id}`, {
      withCredentials: true,
    });
  },
};
