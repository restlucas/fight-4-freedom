import {
  Crosshair,
  Target,
  Heart,
  Trophy,
  Clock,
  GamepadIcon,
  UserX,
  UserRoundX,
  HeartPulse,
  Percent,
} from "lucide-react";
import { CrownSimpleIcon } from "@phosphor-icons/react";
import type { PlayerStats } from "@/src/lib/types";
import { getStats } from "@/src/lib/get-stats";

interface StatBoxProps {
  icon: React.ReactNode;
  value: string | number;
  label?: string;
  isTop?: boolean;
}

interface PlayerStatsProps {
  stats: PlayerStats;
  top: any;
}

function StatBox({ icon, value, label, isTop }: StatBoxProps) {
  return (
    <div
      className={`relative flex items-center gap-1.5 rounded px-2.5 py-1 ${
        isTop ? "bg-gold/10 border border-gold/50" : "bg-secondary/50"
      }`}
    >
      {isTop && (
        <CrownSimpleIcon
          size={16}
          weight="fill"
          className="text-gold absolute -left-2 -top-2"
        />
      )}

      {icon}

      <span
        className={`text-xl flex-nowrap font-bold ${isTop ? "text-gold" : ""}`}
      >
        {value}
      </span>
      <span className={`font-semibold flex-nowrap ${isTop ? "text-gold" : ""}`}>
        {label}
      </span>
    </div>
  );
}

export function PlayerStatsMinimal({ stats, top }: PlayerStatsProps) {
  const playerStats = getStats(stats || null);

  return (
    <div className="mt-auto lg:flex lg:flex-wrap gap-3 grid grid-cols-2">
      <StatBox
        icon={<Percent className="h-5 w-5 text-accent" />}
        value={playerStats.killDeath}
        label="K/D"
        isTop={true}
      />

      <StatBox
        icon={<Crosshair className="h-5 w-5 text-primary" />}
        value={playerStats.kills}
        label="KILLS"
        isTop={true}
      />

      <StatBox
        icon={<HeartPulse className="h-5 w-5 text-red-500/70" />}
        value={playerStats.revives}
        label="REVIVES"
        isTop={true}
      />

      <StatBox
        icon={<Trophy className="h-5 w-5 text-gold" />}
        value={playerStats.winPercent}
        label="WIN"
        isTop={true}
      />

      <StatBox
        icon={<GamepadIcon className="h-5 w-5 text-chart-3" />}
        value={playerStats.matchesPlayed}
        label="PARTIDAS"
        isTop={true}
      />

      <StatBox
        icon={<Clock className="h-5 w-5 text-chart-4" />}
        value={playerStats.timePlayed}
        isTop={true}
      />
    </div>
  );
}
