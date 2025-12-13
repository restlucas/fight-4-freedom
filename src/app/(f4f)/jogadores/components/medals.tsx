import { medals } from "@/src/lib/mock-data";
import { Medal, User } from "@/src/lib/types";

interface PlayerMedalsProps {
  player: User;
}

export function PlayerMedals({ player }: PlayerMedalsProps) {
  let playerMedals: Medal[] = player.medals
    .map((m: string) => medals.find((medal: Medal) => medal.id === m))
    .filter(Boolean) as Medal[];

  if (playerMedals.length === 0) {
    const shuffled = [...medals].sort(() => 0.5 - Math.random());
    playerMedals = shuffled.slice(0, 3);
  }
  return (
    <div className="flex items-center justify-center gap-4 shrink-0">
      {playerMedals.slice(0, 8).map((m: Medal) => (
        <div key={m.id} className="text-xl shrink-0">
          {m.icon}
        </div>
      ))}

      {player.medals.length > 8 && (
        <div className="flex items-center justify-center h-6 w-6 rounded bg-secondary font-bold border">
          +{player.medals.length - 8}
        </div>
      )}
    </div>
  );
}
