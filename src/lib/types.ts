import { Platform, Status } from "./enums";

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
  ea_id?: string;
  trackergg_link?: string;
  medals: string[];
  stats: PlayerStats | null;
  status: Status;
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
  criteria: string;
  icon: string;
  rarity: "comum" | "raro" | "epico" | "lendario";
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  kd: number;
  assists: number;
  revives: number;
  matches: number;
  hoursPlayed: number;
  wins: number;
  losses: number;
  headshots: number;
}
