import { type StaggingMaterialToCutting } from "~/types/staggingMaterialToCutting";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const StaggingMaterialToCuttingService = {
  async getAll() {
    return axios.get(`${API_URL}/stagging-material-to-cutters`);
  },

  async create(data: StaggingMaterialToCutting[]) {
    return axios.post(`${API_URL}/stagging-material-to-cutters`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: StaggingMaterialToCutting) {
    return axios.put(`${API_URL}/stagging-material-to-cutters/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/stagging-material-to-cutters/${id}`);
  },
};
