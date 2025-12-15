import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { medals } from "@/src/lib/mock-data";
import { Medal, User } from "@/src/lib/types";
import { getRandomMedals } from "@/src/utils/get-random-medals";

interface PlayerMedalsProps {
  player: User;
}

export function PlayerMedals({ player }: PlayerMedalsProps) {
  const playerMedals = player.userMedals.map((medal: any) => medal.medal);

  if (!playerMedals) return null;

  return (
    <div className="flex flex-row flex-wrap items-center gap-12 max-lg:justify-center">
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
        {playerMedals.slice(0, 9).map((medal: any) => (
          <Avatar key={medal.id} title={medal.name} className="w-10 h-10">
            <AvatarImage
              src={medal.image}
              alt={medal.name}
              width={50}
              height={50}
            />
          </Avatar>
        ))}
        {playerMedals.length > 9 && (
          <Avatar className="w-10 h-10">
            <AvatarFallback className="text-lg bg-background">
              +{playerMedals.length - 9}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
