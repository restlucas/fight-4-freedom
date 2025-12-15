import { Platform, Rank, Role, Status } from "@/src/lib/enums";

export type UsersFilters = {
  username?: string;
  platform?: Platform | "all";
  rank?: Rank | "all";
  status?: Status | "all";
  role?: Role | "all";
};

export const usersKeys = {
  all: ["users"] as const,

  lists: () => [...usersKeys.all, "list"] as const,

  list: (filters: UsersFilters = {}) =>
    [...usersKeys.lists(), filters] as const,

  listAll: () => usersKeys.list({}),

  listActive: () => usersKeys.list({ status: "ACTIVE" }),

  detail: (id: string) => [...usersKeys.all, "detail", id] as const,
};
