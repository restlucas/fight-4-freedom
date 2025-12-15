import { api } from "@/src/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Medal } from "@/src/lib/types";
import { MedalsFilters, medalsKeys } from "./medals.queryKeys";

const PAGE_SIZE = 20;

interface UseMedalsPaginatedProps {
  filters?: MedalsFilters;
  defaultFilters?: MedalsFilters;
  staleTime?: number;
}

export function useMedalsPaginated({
  filters = {},
  defaultFilters = {},
  staleTime = 1000 * 60 * 1,
}: UseMedalsPaginatedProps) {
  const mergedFilters = {
    ...defaultFilters,
    ...filters,
  };

  return useQuery({
    queryKey: medalsKeys.list({
      ...mergedFilters,
    }),

    queryFn: async () => {
      const { data } = await api.get<Medal[]>("/medals", {
        params: {
          page: mergedFilters.page,
          take: PAGE_SIZE,
          ...mergedFilters,
        },
      });

      return data;
    },
    placeholderData: keepPreviousData,
    gcTime: 1000 * 60 * 5,
    staleTime,
  });
}
