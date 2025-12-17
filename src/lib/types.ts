import { Platform, Rarity, Status, TopStatsCategory } from "./enums";

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: "ADMIN" | "USER";
  avatar: string;
  bio: string;
  rank: string;
  platform?: Platform;
  ea_id: string;
  trackergg_link?: string;
  stats: PlayerStats | null;
  status: Status;
  userMedals: {
    medal: Medal;
    createdAt: string;
    updatedAt: string;
  }[];
  userStats: PlayerStats;
  userTopStats: UserTopStats[];
};

export type Rank = {
  id: string;
  name: string;
  src: string;
  rarity: "comum" | "raro" | "epico" | "lendario";
};

export interface Medal {
  id: string;
  name: string;
  description: string;
  image?: string;
  icon: string;
  rarity: Rarity;
  achieved: {
    count: number;
    percentage: number;
  };
}

export interface PlayerStats {
  id: string;
  user_id: string;
  kills: number;
  deaths: number;
  wins: number;
  loses: number;
  killsPerMinute: number;
  killsPerMatch: number;
  headshots: number;
  assists: number;
  revives: number;
  killDeath: number;
  totalXp: number;
  matchesPlayed: number;
  timePlayed?: string | null;
  accuracy?: string;
  bestClass?: string;
  winPercent?: string;
}

export interface UserTopStats {
  id: string;
  category: TopStatsCategory;
  user_id: string;
  updatedAt: string;
}
