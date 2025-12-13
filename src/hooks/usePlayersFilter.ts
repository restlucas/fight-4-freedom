import { useMemo } from "react";
import { Platform } from "../lib/enums";
import { User } from "../lib/types";

export function usePlayersFilter(
  players: User[],
  searchTerm: string,
  platformFilter: Platform | "all",
  sortBy: string
) {
  return useMemo(() => {
    const filtered = players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.ea_id?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform =
        platformFilter === "all" || player.platform === platformFilter;

      return matchesSearch && matchesPlatform;
    });

    return filtered;
  }, [players, searchTerm, platformFilter, sortBy]);
}
