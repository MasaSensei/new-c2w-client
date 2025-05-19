import axios from "axios";
import { type Item } from "~/types/item";

const API_URL = import.meta.env.VITE_API_URL;

export const ItemsService = {
  async getAll() {
    return axios.get(`${API_URL}/items`, {
      withCredentials: true,
    });
  },
  async get(id: number) {
    return axios.get(`${API_URL}/items/${id}`, {
      withCredentials: true,
    });
  },
  async create(data: Item) {
    return axios.post(`${API_URL}/items`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },
  async update(id: number, data: Item) {
    return axios.put(`${API_URL}/items/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },
  async delete(id: number) {
    return axios.delete(`${API_URL}/items/${id}`, {
      withCredentials: true,
    });
  },
};
