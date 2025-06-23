import axios from "axios";
import { type RawMaterial } from "~/types/rawMaterial";

const API_URL = import.meta.env.VITE_API_URL;

export const RawMaterialService = {
  async getAll() {
    return axios.get(`${API_URL}/raw-materials`, {});
  },
  async get(id: number) {
    return axios.get(`${API_URL}/raw-materials/${id}`, {});
  },
  async create(data: RawMaterial) {
    return axios.post(`${API_URL}/raw-materials`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async update(id: number, data: RawMaterial) {
    return axios.put(`${API_URL}/raw-materials/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async delete(id: number) {
    return axios.delete(`${API_URL}/raw-materials/${id}`, {});
  },
};
