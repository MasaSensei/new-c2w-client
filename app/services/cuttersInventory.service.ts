import axios from "axios";
import { type Model } from "~/types/model";

const API_URL = import.meta.env.VITE_API_URL;

export const CuttersInventoryService = {
  async getAll() {
    return axios.get(`${API_URL}/cutters-inventories`);
  },

  async create(data: any) {
    return axios.post(`${API_URL}/cutters-inventories`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: Model) {
    return axios.put(`${API_URL}/cutters-inventories/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/cutters-inventories/${id}`, {});
  },
};
