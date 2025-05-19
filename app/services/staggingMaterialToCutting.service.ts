import { type StaggingMaterialToCutting } from "~/types/staggingMaterialToCutting";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const StaggingMaterialToCuttingService = {
  async getAll(status?: string[]) {
    const params: any = {};

    if (status && status.length > 0) {
      params.status = status.join(",");
    }

    return axios.get(`${API_URL}/stagging-material-to-cutters`, {
      params,
      withCredentials: true,
    });
  },

  async create(data: StaggingMaterialToCutting[]) {
    return axios.post(`${API_URL}/stagging-material-to-cutters`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: StaggingMaterialToCutting) {
    return axios.put(`${API_URL}/stagging-material-to-cutters/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/stagging-material-to-cutters/${id}`, {
      withCredentials: true,
    });
  },
};
