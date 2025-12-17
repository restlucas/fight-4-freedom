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
  Handshake,
} from "lucide-react";
import { CrownSimpleIcon } from "@phosphor-icons/react";
import type { PlayerStats, UserTopStats } from "@/src/lib/types";
import { getStats, getTopStats } from "@/src/lib/get-stats";

interface StatBoxProps {
  icon: React.ReactNode;
  value: string | number;
  label?: string;
  isTop?: boolean;
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
          className="text-yellow-500 absolute -left-2 -top-2"
        />
      )}

      {icon}

      <span
        className={`text-xl flex-nowrap font-bold ${
          isTop ? "text-yellow-500" : ""
        }`}
      >
        {value}
      </span>
      <span
        className={`font-semibold flex-nowrap ${
          isTop ? "text-yellow-500" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function PlayerStatsMinimal({
  stats,
  topStats,
}: {
  stats: PlayerStats;
  topStats: UserTopStats[];
}) {
  const playerStats = getStats(stats || null);
  const playerTopStats = getTopStats(topStats);

  return (
    <div className="mt-auto lg:flex lg:flex-wrap gap-3 grid grid-cols-2">
      <StatBox
        icon={<Percent className="h-5 w-5 text-accent" />}
        value={playerStats.killDeath}
        label="K/D"
        isTop={playerTopStats.topKillDeath}
      />

      <StatBox
        icon={<Crosshair className="h-5 w-5 text-primary" />}
        value={playerStats.kills}
        label="KILLS"
        isTop={playerTopStats.topKills}
      />

      <StatBox
        icon={<HeartPulse className="h-5 w-5 text-red-500/70" />}
        value={playerStats.revives}
        label="REVIVES"
        isTop={playerTopStats.topRevive}
      />

      <StatBox
        icon={<Handshake className="h-5 w-5 text-emerald-500" />}
        value={playerStats.assists}
        label="ASSISTS"
        isTop={playerTopStats.topAssists}
      />

      <StatBox
        icon={<GamepadIcon className="h-5 w-5 text-chart-3" />}
        value={playerStats.matchesPlayed}
        label="PARTIDAS"
        isTop={playerTopStats.topMatches}
      />

      <StatBox
        icon={<Clock className="h-5 w-5 text-chart-4" />}
        value={playerStats.timePlayed}
        isTop={playerTopStats.topTimePlayed}
      />
    </div>
  );
}
