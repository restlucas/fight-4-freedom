import { api } from "../lib/api";

export const clanService = {
  getStats: async () => {
    const response = await api.get("/clan");
    return response.data;
  },
};
