import {
  Crosshair,
  Target,
  Heart,
  Trophy,
  Clock,
  GamepadIcon,
} from "lucide-react";
import { CrownSimpleIcon } from "@phosphor-icons/react";

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
        isTop ? "bg-primary/10 border border-primary/50" : "bg-secondary/50"
      }`}
    >
      {isTop && (
        <CrownSimpleIcon
          size={16}
          weight="fill"
          className="text-primary absolute -left-2 -top-2"
        />
      )}

      {icon}
      <span className={`text-xl font-bold ${isTop ? "text-primary" : ""}`}>
        {value}
      </span>
      <span className={`font-semibold ${isTop ? "text-primary" : ""}`}>
        {label}
      </span>
    </div>
  );
}

export function PlayerStats({ player, top }: any) {
  return (
    <div className="mt-4 flex flex-wrap gap-6">
      <StatBox
        icon={<Crosshair className="h-5 w-5 text-primary/70" />}
        value={player.stats.kd}
        label="K/D"
        isTop={player.id === top.topKD.id}
      />

      <StatBox
        icon={<Target className="h-5 w-5 text-primary/70" />}
        value={player.stats.kills.toLocaleString()}
        label="KILLS"
        isTop={player.id === top.topKiller.id}
      />

      <StatBox
        icon={<Heart className="h-5 w-5 text-accent/70" />}
        value={player.stats.revives.toLocaleString()}
        label="REVIVES"
        isTop={player.id === top.topReviver.id}
      />

      <StatBox
        icon={<Trophy className="h-5 w-5 text-primary/70" />}
        value={`${player.stats.winRate}%`}
        label="WIN"
        isTop={player.id === top.topWinRate.id}
      />

      <StatBox
        icon={<GamepadIcon className="h-5 w-5 text-primary/70" />}
        value={player.stats.matches.toLocaleString()}
        label="PARTIDAS"
        isTop={player.id === top.topMatches.id}
      />

      <StatBox
        icon={<Clock className="h-5 w-5 text-primary/70" />}
        value={player.stats.hoursPlayed}
        label="H"
        isTop={player.id === top.topHoursPlayed.id}
      />
    </div>
  );
}
