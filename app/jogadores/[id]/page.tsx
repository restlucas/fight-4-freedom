"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { players, medals, ranks } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Trophy,
  Target,
  Heart,
  Crosshair,
  Clock,
  Percent,
  Zap,
  Award,
} from "lucide-react";
import { InstagramLogoIcon } from "@phosphor-icons/react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PageProps) {
  const { id } = await params;
  const player = players.find((p) => p.id === id);

  if (!player) {
    notFound();
  }

  const playerMedals = medals.filter((m) => player.medals.includes(m.id));

  const rarityColors = {
    lendário: "bg-chart-4/20 border-chart-4 text-chart-4",
    épico: "bg-chart-3/20 border-chart-3 text-chart-3",
    raro: "bg-chart-2/20 border-chart-2 text-chart-2",
    comum: "bg-muted/50 border-muted-foreground/30 ",
  };

  const playerRank = ranks.find((rank) => rank.id === player.rank_id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/jogadores">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Jogadores
        </Link>
      </Button>

      {/* Header do Jogador */}
      <Card className="p-8 mb-8 border-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Avatar Section */}
          {player.avatar && (
            <div className="shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-primary/50">
                <Image
                  src="/images/tatical-military.jpg"
                  alt={player.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Player Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">{player.name}</h1>
              <Badge variant="outline" className="text-base px-4">
                {player.platform}
              </Badge>
            </div>

            {/* Bio */}
            {player.bio && (
              <p className="mb-4  leading-relaxed">{player.bio}</p>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>EA ID:</span>
                <span className="font-mono text-foreground">{player.eaId}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Membro desde:</span>
                <span className="text-foreground">
                  {new Date(player.joinedAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Patente */}
          <div className="bg-secondary/50 rounded-lg p-4 min-w-[100px] flex items-center justify-center gap-4 flex-col">
            <Image
              src={playerRank?.src || ""}
              alt={playerRank?.name || ""}
              width={100}
              height={100}
              className="w-20 h-20 object-contain"
            />
            <span className="text-xl font-bold">{playerRank?.name}</span>
          </div>
        </div>
      </Card>

      {/* Estatísticas de Combate */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Crosshair className="h-6 w-6 text-primary" />
          ESTATÍSTICAS DE COMBATE
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Target}
            value={player.stats.kills.toLocaleString()}
            label="Total de Kills"
            iconClass="h-5 w-5 text-primary"
          />

          <StatCard
            icon={Crosshair}
            value={player.stats.deaths.toLocaleString()}
            label="Total de Deaths"
            iconClass="h-5 w-5 text-destructive"
          />

          <StatCard
            icon={Heart}
            value={player.stats.revives.toLocaleString()}
            label="Total de Revives"
            iconClass="h-5 w-5 text-accent"
          />

          <StatCard
            icon={Award}
            value={player.stats.assists.toLocaleString()}
            label="Total de Assists"
            iconClass="h-5 w-5 text-chart-2"
          />

          <StatCard
            icon={Trophy}
            value={`${player.stats.winRate}%`}
            label="Taxa de Vitória"
            iconClass="h-5 w-5 text-primary"
          />

          <StatCard
            icon={Target}
            value={player.stats.matches.toLocaleString()}
            label="Total de Partidas"
            iconClass="h-5 w-5 text-chart-3"
          />

          <StatCard
            icon={Clock}
            value={player.stats.hoursPlayed.toLocaleString()}
            label="Total de Horas Jogadas"
            iconClass="h-5 w-5 text-chart-4"
          />

          <StatCard
            icon={Zap}
            value={`${player.stats.longestKillStreak} kills`}
            label="Maior Kill Streak"
            iconClass="h-5 w-5 text-chart-2"
          />
        </div>
      </div>

      {/* Estatísticas Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-4 border-border gap-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Crosshair className="h-5 w-5 text-primary" />
            Precisão
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg ">Headshots</span>
              <span className="text-2xl font-bold">
                {player.stats.headshots.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg ">Taxa de Headshot</span>
              <span className="text-2xl font-bold">
                {((player.stats.headshots / player.stats.kills) * 100).toFixed(
                  1
                )}
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
                {(player.stats.kills / player.stats.matches).toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg ">Kills por Hora</span>
              <span className="text-2xl font-bold">
                {(player.stats.kills / player.stats.hoursPlayed).toFixed(1)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playerMedals.map((medal) => (
              <Card
                key={medal.id}
                className={`p-6 border ${rarityColors[medal.rarity]}`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{medal.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold">{medal.name}</h3>
                      <Badge variant="outline" className="capitalize text-xs">
                        {medal.rarity}
                      </Badge>
                    </div>
                    <p className="text-lg mb-2">{medal.description}</p>
                    <p className="text-xs ">{medal.criteria}</p>
                  </div>
                </div>
              </Card>
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
