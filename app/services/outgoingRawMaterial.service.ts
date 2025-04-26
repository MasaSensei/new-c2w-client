import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const OutgoingRawMaterialService = {
  getAll() {
    return axios.get(`${API_URL}/outgoing-raw-materials`, {
      withCredentials: true,
    });
  },
};
