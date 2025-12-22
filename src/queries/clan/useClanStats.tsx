import { clanService } from "@/src/services/clan.service";
import { useQuery } from "@tanstack/react-query";
import { ClanStats } from "@/src/lib/types";

export function useClanStats() {
  return useQuery<ClanStats>({
    queryKey: ["home-page-stats"],
    queryFn: clanService.getStats,
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });
}
