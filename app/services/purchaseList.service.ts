import axios from "axios";
import { type PurchaseList } from "~/types/purchaseList";

const API_URL = import.meta.env.VITE_API_URL;

export const PurchaseListService = {
  getAll() {
    return axios.get(`${API_URL}/purchase-lists`, {});
  },
  get(id: number) {
    return axios.get(`${API_URL}/purchase-lists/${id}`, {});
  },
  create(data: PurchaseList) {
    return axios.post(`${API_URL}/purchase-lists`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  update(id: number, data: PurchaseList) {
    return axios.put(`${API_URL}/purchase-lists/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  delete(id: number) {
    return axios.delete(`${API_URL}/purchase-lists/${id}`, {});
  },
};
