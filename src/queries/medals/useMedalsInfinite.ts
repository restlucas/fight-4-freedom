import { api } from "@/src/lib/api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { Medal } from "@/src/lib/types";
import { MedalsFilters, medalsKeys } from "./medals.queryKeys";

const PAGE_SIZE = 20;

interface UseMedalsInfiniteProps {
  filters?: MedalsFilters;
  defaultFilters?: MedalsFilters;
  staleTime?: number;
}

export function useMedalsInfinite({
  filters = {},
  defaultFilters = {},
  staleTime = 1000 * 10,
}: UseMedalsInfiniteProps = {}) {
  const mergedFilters = {
    ...defaultFilters,
    ...filters,
  };

  return useInfiniteQuery({
    queryKey: medalsKeys.list(mergedFilters),

    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await api.get<Medal[]>("/medals", {
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
