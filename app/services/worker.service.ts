import axios from "axios";
import { type Worker } from "~/types/worker";

const API_URL = import.meta.env.VITE_API_URL;

export const WorkersService = {
  async getAll(queryParams: { type?: string }) {
    const { type } = queryParams;
    const params: any = {};
    if (type) {
      params.type = type;
    }

    return axios.get(`${API_URL}/workers`, { params, withCredentials: true });
  },

  async get(id: number) {
    return axios.get(`${API_URL}/workers/${id}`, {
      withCredentials: true,
    });
  },

  async create(data: Worker) {
    return axios.post(`${API_URL}/workers`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
