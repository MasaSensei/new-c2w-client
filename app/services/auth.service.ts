import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  async register(data: { username: string; password: string; role?: string }) {
    return axios.post(`${API_URL}/auth/register`, data, {
      withCredentials: true,
    });
  },
};
