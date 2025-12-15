import { Rarity } from "@/src/lib/enums";

export type MedalsFilters = {
  name?: string;
  rarity?: Rarity | "all";
};

export const medalsKeys = {
  all: ["medals"] as const,

  lists: () => [...medalsKeys.all, "list"] as const,

  list: (filters: MedalsFilters = {}) =>
    [...medalsKeys.lists(), filters] as const,

  listAll: () => medalsKeys.list({}),

  detail: (id: string) => [...medalsKeys.all, "detail", id] as const,
};
