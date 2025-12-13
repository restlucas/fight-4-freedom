import Link from "next/link";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { medals, ranks } from "@/src/lib/mock-data";
import { PlayerStats } from "./stats";
import { Medal } from "@/src/lib/types";

export function PlayerCard({ player, top }: any) {
  const playerRank =
    ranks.find((rank) => rank.id === player.rank_id) ||
    ranks.find((rank) => rank.id === "recruta")!;

  const playerMedals = player.medals
    .map((id: string) => medals.find((m: Medal) => m.id === id))
    .filter(Boolean);

  return (
    <Link href={`/jogadores/${player.username}`}>
      <Card className="p-4 hover:border-primary transition-all group overflow-hidden relative">
        <div className="flex items-start justify-center gap-6">
          <div className="flex items-center gap-2 flex-col">
            <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-primary/30 bg-primary/5">
              <Image
                src={player.avatar || "/images/tatical-military.jpg"}
                alt={player.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <Badge variant="outline" className="h-6 px-3 shrink-0 text-xs">
              {player.platform}
            </Badge>
          </div>

          <div className="flex-1 min-w-0 h-full">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-bold group-hover:text-primary transition-colors truncate">
                    {player.name}
                  </h3>

                  <Image
                    title={playerRank.name}
                    src={playerRank.src}
                    alt={playerRank.name}
                    width={30}
                    height={30}
                    className="w-8 h-8"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-muted-foreground">
                    {player.ea_id}
                  </span>
                  <Image
                    src="https://i.imgur.com/XtbilNR.png"
                    alt="EA Icon"
                    width={20}
                    height={20}
                    className="w-8 h-8"
                  />
                </div>

                {player.bio && (
                  <p className="mt-4 mb-2 line-clamp-4">{player.bio}</p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
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
            </div>

            <PlayerStats player={player} top={top} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
