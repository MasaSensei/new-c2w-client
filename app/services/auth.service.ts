import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  async register(data: { username: string; password: string; role?: string }) {
    return axios.post(`${API_URL}/auth/register`, data, {
      withCredentials: true,
    });
  },

  async login(data: { username: string; password: string }) {
    return axios.post(`${API_URL}/auth/login`, data, { withCredentials: true });
  },

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/auth/check-auth`, {
        withCredentials: true,
      });
      return response;
    } catch (err) {
      console.log("Auth check error:", err);
    }
  },

  async logout() {
    return axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
  },
};
