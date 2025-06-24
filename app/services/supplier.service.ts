import type { Supplier } from "~/types/supplier";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const SuppliersService = {
  async getAll(token: string) {
    return axios.post(
      `${API_URL}/data/Suppliers`,
      {
        query: [],
        offset: 0,
        count: 10,
        order: {
          id: "desc",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  },

  async create(data: Supplier, token: string) {
    return axios.put(`${API_URL}/data/Suppliers`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  async update(id: number, data: Supplier) {
    return axios.put(`${API_URL}/suppliers/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/suppliers/${id}`, {});
  },
};
