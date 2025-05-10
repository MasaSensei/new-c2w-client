import axios from "axios";
import { type Model } from "~/types/model";

const API_URL = import.meta.env.VITE_API_URL;

export const CuttersInventoryService = {
  async getAll() {
    return axios.get(`${API_URL}/cutters-inventories`, {
      withCredentials: true,
    });
  },

  async create(data: any) {
    console.log(data);
    return axios.post(`${API_URL}/cutters-inventories`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: Model) {
    return axios.put(`${API_URL}/cutters-inventories/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/cutters-inventories/${id}`, {
      withCredentials: true,
    });
  },
};
