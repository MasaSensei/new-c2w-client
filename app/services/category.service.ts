import axios from "axios";
import type { Category } from "~/types/category";

const API_URL = import.meta.env.VITE_API_URL;

export const CategoriesService = {
  async getAll() {
    return axios.get(`${API_URL}/categories`, {
      withCredentials: true,
    });
  },

  async create(data: Category) {
    return axios.post(`${API_URL}/categories`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: Category) {
    return axios.put(`${API_URL}/category/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/category/${id}`, {
      withCredentials: true,
    });
  },
};
