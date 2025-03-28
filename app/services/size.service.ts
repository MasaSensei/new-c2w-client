import { type Size } from "~/types/size";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const SizesService = {
  async getAll() {
    return axios.get(`${API_URL}/sizes`);
  },

  async create(data: Size) {
    return axios.post(`${API_URL}/sizes`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: Size) {
    return axios.put(`${API_URL}/sizes/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/sizes/${id}`);
  },
};
