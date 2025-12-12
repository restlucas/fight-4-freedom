import { Player } from "@/lib/types";

export function getTopPlayers(players: Player[]) {
  return {
    topKD: players.reduce((a, b) => (a.stats.kd > b.stats.kd ? a : b)),
    topReviver: players.reduce((a, b) =>
      a.stats.revives > b.stats.revives ? a : b
    ),
    topKiller: players.reduce((a, b) =>
      a.stats.kills > b.stats.kills ? a : b
    ),
    topMatches: players.reduce((a, b) =>
      a.stats.matches > b.stats.matches ? a : b
    ),
    topWinRate: players.reduce((a, b) =>
      a.stats.winRate > b.stats.winRate ? a : b
    ),
    topHoursPlayed: players.reduce((a, b) =>
      a.stats.hoursPlayed > b.stats.hoursPlayed ? a : b
    ),
  };
}
