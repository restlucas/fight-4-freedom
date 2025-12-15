import { api } from "@/src/lib/api";
import { Rarity } from "../lib/enums";

type BaseMedalPayload = {
  id?: string;
  name: string;
  description: string;
  rarity: Rarity;
  image?: string | null;
};

export const medalsService = {
  create: async (payload: BaseMedalPayload) => {
    const { data } = await api.post("/medals", payload);
    return data;
  },

  update: async (payload: BaseMedalPayload) => {
    const { data } = await api.put("/medals", payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete("/medals", { data: { medalId: id } });
    return data;
  },
};
