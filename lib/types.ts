export type Platform = "PC" | "PlayStation" | "Xbox";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: "admin" | "user";
  avatar: string;
  bio: string;
  rank: Rank;
  platform: Platform;
  ea_id: string;
  medals: Medal[];
  stats: PlayerStats;
};

export type Rank = {
  id: string;
  name: string;
  description: string;
  src: string;
  rarity: "comum" | "raro" | "épico" | "lendário";
};

export interface Medal {
  id: string;
  name: string;
  description: string;
  criteria: string;
  icon: string;
  rarity: "comum" | "raro" | "épico" | "lendário";
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  kd: number;
  assists: number;
  revives: number;
  matches: number;
  hoursPlayed: number;
  winRate: number;
  headshots: number;
  longestKillStreak: number;
}

export interface Player {
  id: string;
  name: string;
  eaId: string;
  rank_id: string;
  platform: Platform;
  stats: PlayerStats;
  medals: string[];
  joinedAt: string;
  avatar?: string;
  bio?: string;
}
