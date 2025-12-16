import { parseTimePlayed } from "../utils/string";
import { PlayerStats } from "./types";

export function getStats(userStats: PlayerStats | null) {
  const timePlayed = parseTimePlayed(userStats?.timePlayed || "");

  return {
    kills: userStats?.kills || 0,
    deaths: userStats?.deaths || 0,
    wins: userStats?.wins || 0,
    loses: userStats?.loses || 0,
    killsPerMinute: userStats?.killsPerMinute || 0,
    killsPerMatch: userStats?.killsPerMatch || 0,
    headshots: userStats?.headshots || 0,
    assists: userStats?.assists || 0,
    revives: userStats?.revives || 0,
    killDeath: userStats?.killDeath || 0,
    totalXp: userStats?.totalXp || 0,
    matchesPlayed: userStats?.matchesPlayed || 0,
    timePlayed,
    accuracy: userStats?.accuracy || 0,
    bestClass: userStats?.bestClass || 0,
    winPercent: userStats?.winPercent || 0,
  };
}
