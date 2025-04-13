import axios from "axios";
import { type PurchaseListDetail } from "~/types/purchaseListDetail";

const API_URL = import.meta.env.VITE_API_URL;

export const PurchaseListDetailServiceReturn = {
  getAll() {
    return axios.get(`${API_URL}/purchase-list-detail-returns`);
  },
  get(id: number) {
    return axios.get(`${API_URL}/purchase-list-detail-returns/${id}`);
  },
  create(data: PurchaseListDetail[]) {
    return axios.post(`${API_URL}/purchase-list-detail-returns`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  update(id: number, data: PurchaseListDetail) {
    return axios.put(`${API_URL}/purchase-list-detail-returns/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  delete(id: number) {
    return axios.delete(`${API_URL}/purchase-list-detail-returns/${id}`);
  },
};
