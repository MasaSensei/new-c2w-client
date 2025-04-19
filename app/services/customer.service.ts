import type { Customer } from "~/types/customer";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const CustomersService = {
  async getAll() {
    return axios.get(`${API_URL}/customers`, {
      withCredentials: true,
    });
  },

  async create(data: Customer) {
    return axios.post(`${API_URL}/customers`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async update(id: number, data: Customer) {
    return axios.put(`${API_URL}/customers/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/customers/${id}`, {
      withCredentials: true,
    });
  },
};
