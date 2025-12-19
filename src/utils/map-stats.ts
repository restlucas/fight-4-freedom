export const mapStats = (apiData: any) => {
  return {
    kills: apiData.kills,
    deaths: apiData.deaths,
    wins: apiData.wins,
    losses: apiData.losses,
    hsPercent: apiData.hsPercent,
    assists: apiData.assists,
    revives: apiData.revives,
    killDeath: apiData.killDeath,
    objectivesCaptured: apiData.objectivesCaptured,
    objectivesDestroyed: apiData.objectivesDestroyed,
    bestClass: apiData.bestClass.toUpperCase(),
    timePlayed: apiData.timePlayed,
    matchesPlayed: apiData.wins + apiData.losses,
    winPercent: ((apiData.wins / (apiData.wins + apiData.losses)) * 100)
      .toFixed(2)
      .toString(),
  };
};

export const getBestClass = (className: string) => {
  const classes = [
    {
      name: "Assalto",
      value: "ASSAULT",
    },
    {
      name: "Recon",
      value: "RECON",
    },
    {
      name: "Engenheiro",
      value: "ENGINEER",
    },
    {
      name: "Suporte",
      value: "SUPPORT",
    },
  ];

  const bestClass = classes.find((classItem) => classItem.value === className);

  return bestClass?.name || "";
};
