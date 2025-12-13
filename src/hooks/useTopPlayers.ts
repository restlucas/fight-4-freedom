// import { User } from "../lib/types";

// export function useTopPlayers(players: User[]) {
//   const top = (key: keyof (typeof players)[0]["stats"]) =>
//     players.reduce((prev, current) =>
//       prev.stats[key] > current.stats[key] ? prev : current
//     );

//   return {
//     topKD: top("kd"),
//     topReviver: top("revives"),
//     topKiller: top("kills"),
//     topMatches: top("matches"),
//     topWinRate: top("winRate"),
//     topHoursPlayed: top("hoursPlayed"),
//   };
// }
