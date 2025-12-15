import { api } from "@/src/lib/api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { User } from "@/src/lib/types";
import { usersKeys, UsersFilters } from "./users.queryKeys";

const PAGE_SIZE = 20;

interface UseUsersInfiniteProps {
  filters?: UsersFilters;
  defaultFilters?: UsersFilters;
  staleTime?: number;
}

export function useUsersInfinite({
  filters = {},
  defaultFilters = {},
  staleTime = 1000 * 10,
}: UseUsersInfiniteProps = {}) {
  const mergedFilters = {
    ...defaultFilters,
    ...filters,
  };

  return useInfiniteQuery({
    queryKey: usersKeys.list(mergedFilters),

    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await api.get<User[]>("/users", {
        params: {
          skip: pageParam,
          take: PAGE_SIZE,
          ...mergedFilters,
        },
      });

      return data;
    },

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },

    initialPageParam: 0,
    placeholderData: keepPreviousData,
    staleTime,
  });
}
