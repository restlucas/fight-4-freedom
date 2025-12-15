import { api } from "@/src/lib/api";

export const inviteService = {
  generate: async (eaId: string) => {
    const { data } = await api.post("/invite", { ea_id: eaId });
    return data;
  },

  validate: async (token: string) => {
    const { data } = await api.get(`/invite/${token}`);
    return data;
  },
};
