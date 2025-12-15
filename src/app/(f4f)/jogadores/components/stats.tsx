import {
  Crosshair,
  Target,
  Heart,
  Trophy,
  Clock,
  GamepadIcon,
} from "lucide-react";
import { CrownSimpleIcon } from "@phosphor-icons/react";
import { cloneElement, isValidElement } from "react";

interface StatBoxProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
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

export function PlayerStats({ player, top }: any) {
  const winRate = player.stats?.matches
    ? (player.stats.wins / player.stats.matches) * 100
    : 0;

  return (
    <div className="mt-auto lg:flex lg:flex-wrap gap-3 grid grid-cols-2">
      <StatBox
        icon={<Crosshair className="h-5 w-5 text-primary/70" />}
        value={player.stats ? player.stats.kd.toLocaleString() : 0}
        label="K/D"
        isTop={player.id === top.topKD.id}
      />

      <StatBox
        icon={<Target className="h-5 w-5 text-emerald-500/70" />}
        value={player.stats ? player.stats.kills.toLocaleString() : 0}
        label="KILLS"
        isTop={player.id === top.topKiller.id}
      />

      <StatBox
        icon={<Heart className="h-5 w-5 text-red-500/70" />}
        value={player.stats ? player.stats.revives.toLocaleString() : 0}
        label="REVIVES"
        isTop={player.id === top.topReviver.id}
      />

      <StatBox
        icon={<Trophy className="h-5 w-5 text-gold/70" />}
        value={`${winRate.toLocaleString()}%`}
        label="WIN"
        isTop={player.id === top.topWinRate.id}
      />

      <StatBox
        icon={<GamepadIcon className="h-5 w-5 text-emerald-500/70" />}
        value={player.stats ? player.stats.matches.toLocaleString() : 0}
        label="PARTIDAS"
        isTop={player.id === top.topMatches.id}
      />

      <StatBox
        icon={<Clock className="h-5 w-5 text-primary/70" />}
        value={player.stats ? player.stats.hoursPlayed.toLocaleString() : 0}
        label="H"
        isTop={player.id === top.topHoursPlayed.id}
      />
    </div>
  );
}
