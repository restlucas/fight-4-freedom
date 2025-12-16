import { api } from "@/src/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Medal } from "@/src/lib/types";
import { MedalsFilters, medalsKeys } from "./medals.queryKeys";

const PAGE_SIZE = 20;

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
};

export function useMedalsPaginated({
  filters = {},
  defaultFilters = {},
  staleTime = 1000 * 60 * 1,
}: {
  filters?: MedalsFilters;
  defaultFilters?: MedalsFilters;
  staleTime?: number;
}) {
  const mergedFilters = {
    page: 1,
    size: PAGE_SIZE,
    ...defaultFilters,
    ...filters,
  };

  return useQuery({
    queryKey: medalsKeys.list(mergedFilters),

    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Medal>>("/medals", {
        params: mergedFilters,
      });

      return data;
    },

    placeholderData: keepPreviousData,
    gcTime: 1000 * 60 * 5,
    staleTime,
  });
}
