"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ranks } from "@/src/lib/mock-data";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  ArrowLeft,
  Trophy,
  Target,
  Heart,
  Crosshair,
  Clock,
  Percent,
  Award,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Medal, User } from "@/src/lib/types";
import { getInitials } from "@/src/utils/string";
import { usersService } from "@/src/services/user.service";
import { MedalCard } from "@/src/components/medal-card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function PlayerPage() {
  const params = useParams();
  const username = params.username;

  const {
    data: player,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["player", username],
    queryFn: () => usersService.fetchByUsername(username as string),
    enabled: !!username,
  });

  if (isLoading) return <PlayerSkeleton />;

  if (!player || error) {
    notFound();
  }

  const playerRank =
    ranks.find((rank) => rank.id === player.rank) ||
    ranks.find((rank) => rank.id === "recruta")!;

  const playerMedals = player.userMedals.map((medal: any) => medal.medal);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6 hover:text-white">
        <Link href="/jogadores">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Jogadores
        </Link>
      </Button>

      {/* Header do Jogador */}
      <Card className="p-8 mb-8 border-border">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Avatar Section */}
          <Avatar className="max-lg:m-auto relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-primary/50">
            <AvatarImage src={player.avatar} alt={player.name} />
            <AvatarFallback className="text-5xl font-bold rounded-none">
              {getInitials(player.name)}
            </AvatarFallback>
          </Avatar>

          {/* Player Info */}
          <div className="flex-1">
            <div className="flex items-center justify-center">
              <Badge
                variant="outline"
                className="text-base px-4 mb-2 lg:hidden"
              >
                {player.platform}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center max-lg:justify-center gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-bold">{player.name}</h1>
              <Badge
                variant="outline"
                className="text-base px-4 hidden lg:block"
              >
                {player.platform}
              </Badge>
            </div>

            <div className="flex items-center max-lg:justify-center gap-2">
              <img src="/icons/ea.svg" alt="Logo" width={25} height={25} />
              <span className="font-mono text-foreground">{player.ea_id}</span>
            </div>

            {/* Bio */}
            {player.bio && <p className="my-6 leading-relaxed">{player.bio}</p>}
          </div>

          {/* Patente */}
          <div className="flex items-center max-lg:justify-center gap-2">
            <span>Membro desde:</span>
            <span className="text-foreground">
              {new Date(player.createdAt).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 min-w-[100px] flex items-center justify-center gap-4 flex-col">
            <Image
              src={playerRank.src}
              alt={playerRank.name}
              width={100}
              height={100}
              className="w-20 h-20 object-contain"
            />
            <span className="text-xl font-bold">{playerRank.name}</span>
          </div>
        </div>
      </Card>

      {/* Estatísticas de Combate */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Crosshair className="h-6 w-6 text-primary" />
          ESTATÍSTICAS DE COMBATE
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Target}
            value={player.stats?.kills.toLocaleString() || "0"}
            label="Total de Kills"
            iconClass="h-5 w-5 text-primary"
          />

          <StatCard
            icon={Crosshair}
            value={player.stats?.deaths.toLocaleString() || "0"}
            label="Total de Deaths"
            iconClass="h-5 w-5 text-destructive"
          />

          <StatCard
            icon={Heart}
            value={player.stats?.revives.toLocaleString() || "0"}
            label="Total de Revives"
            iconClass="h-5 w-5 text-accent"
          />

          <StatCard
            icon={Award}
            value={player.stats?.assists.toLocaleString() || "0"}
            label="Total de Assists"
            iconClass="h-5 w-5 text-chart-2"
          />

          <StatCard
            icon={Trophy}
            value={`${player.stats?.wins ?? 0}`}
            label="Vitórias"
            iconClass="h-5 w-5 text-primary"
          />

          <StatCard
            icon={Trophy}
            value={`${player.stats?.losses ?? 0}`}
            label="Derrotas"
            iconClass="h-5 w-5 text-primary"
          />

          <StatCard
            icon={Target}
            value={player.stats?.matches.toLocaleString() || "0"}
            label="Total de Partidas"
            iconClass="h-5 w-5 text-chart-3"
          />

          <StatCard
            icon={Clock}
            value={player.stats?.hoursPlayed.toLocaleString() || "0"}
            label="Total de Horas Jogadas"
            iconClass="h-5 w-5 text-chart-4"
          />
        </div>
      </div>

      {/* Estatísticas Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-4 border-border gap-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Crosshair className="h-5 w-5 text-primary" />
            Precisão
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg ">Headshots</span>
              <span className="text-2xl font-bold">
                {player.stats?.headshots.toLocaleString() || "0"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg ">Taxa de Headshot</span>
              <span className="text-2xl font-bold">
                {(
                  ((player.stats?.headshots || 0) /
                    (player.stats?.kills || 0)) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border gap-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Percent className="h-5 w-5 text-accent" />
            Performance
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg ">Kills por Partida</span>
              <span className="text-2xl font-bold">
                {(player.stats?.kills! / player.stats?.matches!).toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg ">Kills por Hora</span>
              <span className="text-2xl font-bold">
                {(player.stats?.kills! / player.stats?.hoursPlayed!).toFixed(1)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quadro de Medalhas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          QUADRO DE MEDALHAS ({playerMedals.length})
        </h2>

        {playerMedals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {playerMedals.map((medal: Medal) => (
              <MedalCard key={medal.id} medal={medal} showPercentage={false} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-border">
            <Trophy className="h-12 w-12  mx-auto mb-4" />
            <p className="">Nenhuma medalha conquistada ainda.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

const StatCard = ({
  icon: Icon,
  value,
  label,
  iconClass,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  label: string;
  iconClass: string;
}) => (
  <Card className="p-4 border-border gap-2">
    <div className="flex items-center justify-between mb-2">
      <Icon className={iconClass} />
      <div className="text-3xl font-bold">{value}</div>
    </div>
    <div className="text-lg">{label}</div>
  </Card>
);

const PlayerSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      {/* Botão de Voltar */}
      <Skeleton className="h-10 w-40 rounded-lg mb-6" />

      {/* Header do Jogador */}
      <Card className="p-8 mb-8 border-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-muted/50 animate-pulse"></div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="h-8 w-1/3 bg-muted/50 rounded animate-pulse"></div>
            <div className="h-6 w-1/4 bg-muted/50 rounded animate-pulse"></div>
            <div className="space-y-2 mt-2">
              <div className="h-4 w-1/2 bg-muted/50 rounded animate-pulse"></div>
              <div className="h-4 w-1/3 bg-muted/50 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Patente */}
          <div className="bg-secondary/50 rounded-lg p-4 min-w-[100px] flex items-center justify-center gap-4 flex-col">
            <div className="w-20 h-20 bg-muted/50 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-muted/50 rounded animate-pulse"></div>
          </div>
        </div>
      </Card>

      {/* Estatísticas de Combate */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card className="p-4 border-border gap-2" key={i}>
            <Skeleton className="h-6 w-6 bg-muted/50 rounded" />
            <Skeleton className="h-8 w-16 bg-muted/50 rounded mt-2" />
            <Skeleton className="h-4 w-20 bg-muted/50 rounded" />
          </Card>
        ))}
      </div>

      {/* Estatísticas Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-4 border-border gap-2">
            <Skeleton className="h-6 w-28 bg-muted/50 rounded" />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-8 w-20" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
