import { api } from "@/src/lib/api";
import { User } from "@/src/lib/types";
import { Platform, Ranks, Status } from "@prisma/client";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20;

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Filters = {
  username?: string;
  platform?: Platform;
  rank?: Ranks;
  status?: Status;
};

interface UseUsersInfiniteProps {
  content?: "players" | "medals";
  filters?: Filters;
  cacheTime?: number;
}

export function useUsersInfinite({
  content = "players",
  filters = {},
  cacheTime = 1000 * 10,
}: UseUsersInfiniteProps = {}) {
  return useInfiniteQuery({
    queryKey: ["users", filters],
    queryFn: async ({ pageParam = 0 }) => {
      const endpoint = content === "players" ? "/users" : "/medals";

      const res = await api.get<User[]>(endpoint, {
        params: { skip: pageParam, take: PAGE_SIZE, ...filters },
      });

      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },
    staleTime: cacheTime,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
  });
}
