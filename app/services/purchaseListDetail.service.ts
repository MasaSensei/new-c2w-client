import axios from "axios";
import { type PurchaseListDetail } from "~/types/purchaseListDetail";

const API_URL = import.meta.env.VITE_API_URL;

export const PurchaseListDetailService = {
  getAll() {
    return axios.get(`${API_URL}/purchase-list-details`);
  },
  get(id: number) {
    return axios.get(`${API_URL}/purchase-list-details/${id}`);
  },
  create(data: PurchaseListDetail[]) {
    return axios.post(`${API_URL}/purchase-list-details`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  update(id: number, data: PurchaseListDetail) {
    return axios.put(`${API_URL}/purchase-list-details/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  delete(id: number) {
    return axios.delete(`${API_URL}/purchase-list-details/${id}`);
  },
};
