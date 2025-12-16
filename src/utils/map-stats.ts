export function mapStats(apiData: any) {
  return {
    kills: apiData.kills,
    deaths: apiData.deaths,
    wins: apiData.wins,
    loses: apiData.loses,
    killsPerMinute: apiData.killsPerMinute,
    killsPerMatch: apiData.killsPerMatch,
    headshots: apiData.headShots,
    assists: apiData.killAssists,
    revives: apiData.revives,
    killDeath: apiData.killDeath,
    totalXp: apiData.XP[0].total,
    matchesPlayed: apiData.matchesPlayed,
    timePlayed: apiData.timePlayed,
    accuracy: apiData.accuracy,
    bestClass: apiData.bestClass.toUpperCase(),
    winPercent: apiData.winPercent,
  };
}
