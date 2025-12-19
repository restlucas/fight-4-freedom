import { PlayerStats, UserTopStats } from "./types";

export function getStats(userStats: PlayerStats | null) {
  return {
    kills: userStats?.kills || 0,
    deaths: userStats?.deaths || 0,
    wins: userStats?.wins || 0,
    losses: userStats?.losses || 0,
    assists: userStats?.assists || 0,
    revives: userStats?.revives || 0,
    killDeath: userStats?.killDeath || 0,
    matchesPlayed: userStats?.matchesPlayed || 0,
    timePlayed: userStats?.timePlayed || 0,
    hsPercent: userStats?.hsPercent || 0,
    objectivesCaptured: userStats?.objectivesCaptured || 0,
    objectivesDestroyed: userStats?.objectivesDestroyed || 0,
    bestClass: userStats?.bestClass || "",
    winPercent: userStats?.winPercent || 0,
  };
}

export function getTopStats(userTopStats: UserTopStats[]) {
  return {
    topKillDeath: userTopStats.some((s) => s.category === "KILLS_DEATHS"),
    topKills: userTopStats.some((s) => s.category === "KILLS"),
    topRevive: userTopStats.some((s) => s.category === "REVIVES"),
    topAssists: userTopStats.some((s) => s.category === "ASSISTS"),
    topMatches: userTopStats.some((s) => s.category === "MATCHES"),
    topTimePlayed: userTopStats.some((s) => s.category === "TIME_PLAYED"),
  };
}
