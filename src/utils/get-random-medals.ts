import { Medal } from "../lib/types";

export const getRandomMedals = (medals: Medal[], amount: number) => {
  return [...medals].sort(() => Math.random() - 0.5).slice(0, amount);
};
