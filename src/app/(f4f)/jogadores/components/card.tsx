import Link from "next/link";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { ranks } from "@/src/lib/mock-data";
import { PlayerStats } from "./stats";
import { PlayerMedals } from "./medals";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { getInitials } from "@/src/utils/string";

export function PlayerCard({ player, top }: any) {
  const playerRank =
    ranks.find((rank) => rank.id === player.rank_id) ||
    ranks.find((rank) => rank.id === "recruta")!;

  return (
    <Link href={`/jogadores/${player.username}`}>
      {/* Desktop View - Min 1024px*/}
      <Card className="p-4 hover:border-primary transition-all group overflow-hidden relative hidden lg:flex">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-center gap-2 flex-col">
            <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-primary/30 bg-primary/5">
              {player.avatar ? (
                <Image
                  src={player.avatar}
                  alt={player.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Avatar className="w-full h-full rounded-none">
                  <AvatarFallback className="text-5xl font-bold rounded-none">
                    {getInitials(player.name)}
                  </AvatarFallback>
                </Avatar>
              )}
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

              <PlayerMedals player={player} />
            </div>

            <PlayerStats player={player} top={top} />
          </div>
        </div>
      </Card>

      {/* Mobile View - Max 1023px*/}
      <Card className="p-4 hover:border-primary transition-all group overflow-hidden relative flex lg:hidden">
        <div className="flex items-start gap-2">
          <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-primary/30 bg-primary/5">
            {player.avatar ? (
              <Image
                src={player.avatar}
                alt={player.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : (
              <Avatar className="w-full h-full rounded-none">
                <AvatarFallback className="text-5xl font-bold rounded-none">
                  {getInitials(player.name)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          <div className="flex flex-1 min-h-28 flex-col gap-1 relative">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors truncate">
              {player.name}
            </h3>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {player.ea_id}
              </span>
              <Badge variant="outline" className="h-6 px-3 shrink-0 text-xs">
                {player.platform}
              </Badge>
            </div>

            {player.bio && (
              <p className="mt-4 mb-2 line-clamp-4 text-sm">{player.bio}</p>
            )}

            <Image
              title={playerRank.name}
              src={playerRank.src}
              alt={playerRank.name}
              width={30}
              height={30}
              className="w-8 h-8 absolute top-0 right-0"
            />
          </div>
        </div>

        <PlayerStats player={player} top={top} />

        <PlayerMedals player={player} />
      </Card>
    </Link>
  );
}
