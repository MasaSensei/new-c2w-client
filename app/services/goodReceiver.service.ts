import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const GoodReceiverService = {
  getAll(token: string) {
    return axios.post(
      `${API_URL}/good-receive/list`,
      {
        query: [],
        offset: 0,
        count: 10,
        order: {
          id: "asc",
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
  get(id: number) {
    return axios.get(`${API_URL}/good-receive/list`, {});
  },
  create(data: any[]) {
    return axios.post(`${API_URL}/good-receive/list`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  update(id: number, data: any) {
    return axios.put(`${API_URL}/good-receive/list/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  delete(id: number) {
    return axios.delete(`${API_URL}/good-receive/list/${id}`, {});
  },
};
