import { useMemo } from "react";
import { Platform, Player } from "@/lib/types";

export function usePlayersFilter(
  players: Player[],
  searchTerm: string,
  platformFilter: Platform | "all",
  sortBy: string
) {
  return useMemo(() => {
    const filtered = players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.eaId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform =
        platformFilter === "all" || player.platform === platformFilter;

      return matchesSearch && matchesPlatform;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "kd":
          return b.stats.kd - a.stats.kd;
        case "kills":
          return b.stats.kills - a.stats.kills;
        case "revives":
          return b.stats.revives - a.stats.revives;
        case "winRate":
          return b.stats.winRate - a.stats.winRate;
        case "hoursPlayed":
          return b.stats.hoursPlayed - a.stats.hoursPlayed;
        default:
          return 0;
      }
    });

    return filtered;
  }, [players, searchTerm, platformFilter, sortBy]);
}
