import { Rarity } from "../lib/enums";

export const getMedalColor = (rarity: Rarity) => {
  switch (rarity) {
    case "COMMON":
      return {
        border: "border-gray-500",
        background: "bg-gray-500/10",
        badge: "bg-gray-500",
        glow: "hover:shadow-[0_0_10px_rgba(107,114,128,0.4)]",
      };
    case "RARE":
      return {
        border: "border-emerald-500",
        background: "bg-emerald-500/10",
        badge: "bg-emerald-500",
        glow: "hover:shadow-[0_0_10px_rgba(16,185,129,0.4)]",
      };
    case "EPIC":
      return {
        border: "border-blue-500",
        background: "bg-blue-500/10",
        badge: "bg-blue-500",
        glow: "hover:shadow-[0_0_10px_rgba(59,130,246,0.4)]",
      };
    case "LEGENDARY":
      return {
        border: "border-purple-500",
        background: "bg-purple-500/10",
        badge: "bg-purple-500",
        glow: "hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]",
      };
    case "UNIQUE":
      return {
        border: "border-orange-500",
        background: "bg-orange-500/10",
        badge: "bg-orange-500",
        glow: "hover:shadow-[0_0_10px_rgba(249,115,22,0.4)]",
      };
  }
};

export const getMedalRarity = (rarity: Rarity) => {
  switch (rarity) {
    case "COMMON":
      return "Comum";
    case "RARE":
      return "Raro";
    case "EPIC":
      return "Épico";
    case "LEGENDARY":
      return "Lendário";
    case "UNIQUE":
      return "Único";
  }
};
