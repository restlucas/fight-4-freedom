import { User } from "@/src/lib/types";

export function getTopPlayers(players: User[]) {
  const getValue = (p: User, key: keyof NonNullable<User["stats"]>) =>
    p.stats?.[key] ?? 0;

  return {
    topKD: players.reduce((a, b) =>
      getValue(a, "kd") > getValue(b, "kd") ? a : b
    ),
    topReviver: players.reduce((a, b) =>
      getValue(a, "revives") > getValue(b, "revives") ? a : b
    ),
    topKiller: players.reduce((a, b) =>
      getValue(a, "kills") > getValue(b, "kills") ? a : b
    ),
    topMatches: players.reduce((a, b) =>
      getValue(a, "matches") > getValue(b, "matches") ? a : b
    ),
    topWinRate: players.reduce((a, b) => {
      const winRateA = a.stats?.matches
        ? (a.stats.wins / a.stats.matches) * 100
        : 0;
      const winRateB = b.stats?.matches
        ? (b.stats.wins / b.stats.matches) * 100
        : 0;

      return winRateA > winRateB ? a : b;
    }),
    topHoursPlayed: players.reduce((a, b) =>
      getValue(a, "hoursPlayed") > getValue(b, "hoursPlayed") ? a : b
    ),
  };
}
