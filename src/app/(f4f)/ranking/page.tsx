"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Clock,
  ChevronRight,
  Crown,
  MedalIcon,
  Award,
} from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const players = [
  {
    id: "1",
    name: "DarkWolf",
    eaId: "DarkWolf#4521",
    rank: "Marechal",
    platform: "PC",
    avatar: "/tactical-military-avatar-dark-wolf.jpg",
    bio: "Veterano de BF desde 2002. Especialista em sniper e táticas de longo alcance.",
    stats: {
      kills: 15420,
      deaths: 6234,
      kd: 2.47,
      assists: 3421,
      revives: 1876,
      matches: 1543,
      hoursPlayed: 847,
      winRate: 62.4,
      headshots: 4231,
      longestKillStreak: 32,
    },
    medals: ["killstreak-20", "sniper-elite", "veteran", "clutch-master"],
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "PhoenixRising",
    eaId: "PhoenixRising#8821",
    rank: "General",
    platform: "PlayStation",
    avatar: "/tactical-military-avatar-phoenix.jpg",
    bio: "Jogador agressivo focado em objetivos. MVP em 80% das partidas ranqueadas.",
    stats: {
      kills: 18765,
      deaths: 7123,
      kd: 2.63,
      assists: 4567,
      revives: 2134,
      matches: 1876,
      hoursPlayed: 1024,
      winRate: 65.2,
      headshots: 5432,
      longestKillStreak: 28,
    },
    medals: [
      "killstreak-20",
      "revive-master",
      "veteran",
      "first-blood",
      "ace-pilot",
    ],
    joinedAt: "2024-01-10",
  },
  {
    id: "3",
    name: "ShadowStrike",
    eaId: "ShadowStrike#3421",
    rank: "Coronel",
    platform: "Xbox",
    avatar: "/tactical-military-avatar-shadow.jpg",
    bio: "Médico de campo dedicado. Sempre priorizo reviver os companheiros em combate.",
    stats: {
      kills: 12340,
      deaths: 5678,
      kd: 2.17,
      assists: 2891,
      revives: 3421,
      matches: 1234,
      hoursPlayed: 687,
      winRate: 58.3,
      headshots: 3421,
      longestKillStreak: 25,
    },
    medals: [
      "revive-master",
      "team-player",
      "objective-hero",
      "vehicle-destroyer",
    ],
    joinedAt: "2024-02-20",
  },
  {
    id: "4",
    name: "IronViper",
    eaId: "IronViper#7654",
    rank: "Major",
    platform: "PC",
    avatar: "/tactical-military-avatar-viper.jpg",
    bio: "Especialista em destruição de veículos e suporte anti-tanque.",
    stats: {
      kills: 9876,
      deaths: 4532,
      kd: 2.18,
      assists: 2134,
      revives: 987,
      matches: 987,
      hoursPlayed: 543,
      winRate: 56.7,
      headshots: 2765,
      longestKillStreak: 22,
    },
    medals: ["sniper-elite", "first-blood", "vehicle-destroyer"],
    joinedAt: "2024-03-05",
  },
  {
    id: "5",
    name: "ThunderBolt",
    eaId: "ThunderBolt#2109",
    rank: "Capitão",
    platform: "PC",
    avatar: "/tactical-military-avatar-thunder.jpg",
    bio: "Jogador equilibrado focado em captura de objetivos e trabalho em equipe.",
    stats: {
      kills: 8765,
      deaths: 4123,
      kd: 2.13,
      assists: 1987,
      revives: 876,
      matches: 876,
      hoursPlayed: 456,
      winRate: 54.2,
      headshots: 2341,
      longestKillStreak: 20,
    },
    medals: ["team-player", "objective-hero", "first-blood"],
    joinedAt: "2024-03-15",
  },
  {
    id: "6",
    name: "NightHawk",
    eaId: "NightHawk#5543",
    rank: "Tenente",
    platform: "PlayStation",
    avatar: "/tactical-military-avatar-hawk.jpg",
    bio: "Novo no clã, mas sempre dando o meu melhor. Focado em evoluir constantemente.",
    stats: {
      kills: 7654,
      deaths: 3876,
      kd: 1.97,
      assists: 1654,
      revives: 765,
      matches: 765,
      hoursPlayed: 398,
      winRate: 52.1,
      headshots: 1987,
      longestKillStreak: 18,
    },
    medals: ["team-player", "objective-hero"],
    joinedAt: "2024-04-01",
  },
];

export default function LeaderboardPage() {
  const [timeUntilReset, setTimeUntilReset] = useState("");
  const [nextResetLabel, setNextResetLabel] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      // Último dia do mês às 23:59:59
      let lastDayOfMonth = new Date(year, month + 1, 0);
      lastDayOfMonth.setHours(23, 59, 59, 999);

      // Se já passou, pega o último dia do próximo mês
      if (now > lastDayOfMonth) {
        lastDayOfMonth = new Date(year, month + 2, 0);
        lastDayOfMonth.setHours(23, 59, 59, 999);
      }

      const diff = lastDayOfMonth.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilReset(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      // ---------- DAYJS LABEL ----------
      const today = dayjs();
      const resetDate = dayjs(lastDayOfMonth).startOf("day");

      if (resetDate.isSame(today, "day")) {
        setNextResetLabel("Hoje, 23:59");
      } else if (resetDate.diff(today, "day") === 1) {
        setNextResetLabel("Amanhã, 23:59");
      } else {
        setNextResetLabel(resetDate.format("D [de] MMMM[, 23:59]"));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 100000);

    return () => clearInterval(interval);
  }, []);

  const playersWithPoints = players.map((player) => ({
    ...player,
    weeklyPoints: Math.floor(
      player.stats.kills * 2 +
        player.stats.assists * 5 +
        player.stats.revives * 8 +
        player.stats.kd * 2 +
        player.stats.winRate * 10
    ),
  }));

  const allPlayers = [...playersWithPoints];
  for (let i = playersWithPoints.length; i < 50; i++) {
    const basePlayer = playersWithPoints[i % playersWithPoints.length];
    allPlayers.push({
      ...basePlayer,
      id: `${i + 1}`,
      name: `${basePlayer.name}${i + 1}`,
      eaId: `${basePlayer.name}${i + 1}#${Math.floor(Math.random() * 9999)}`,
      weeklyPoints: Math.floor(Math.random() * 50000) + 10000,
    });
  }

  // Ordenar por pontos
  const sortedPlayers = allPlayers.sort(
    (a, b) => b.weeklyPoints - a.weeklyPoints
  );

  // Top 3 para destaque
  const topThree = sortedPlayers.slice(0, 3);
  const restOfPlayers = sortedPlayers.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">
              Ranking Mensal
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Ranking dos melhores jogadores do mês
          </p>
        </div>

        {/* Timer de Reset */}
        <Card className="p-6 mb-8 bg-linear-to-r from-primary/10 via-primary/5 to-background border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Reset do ranking em
                </p>
                <p className="text-2xl font-bold text-primary tabular-nums">
                  {timeUntilReset}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Próximo reset</p>
              <p className="text-lg font-semibold">{nextResetLabel}</p>
            </div>
          </div>
        </Card>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            Pódio
          </h2>

          <div className="flex items-end justify-center gap-4 lg:gap-8 flex-wrap lg:flex-nowrap px-4">
            {/* 2º Lugar - Esquerda */}
            <div className="w-full sm:w-64 lg:w-72 order-2 lg:order-1">
              <Link
                href={`/jogadores/${topThree[1].id}`}
                className="group block"
              >
                <Card className="relative overflow-hidden border-2 border-zinc-400/50 bg-linear-to-br from-zinc-400/10 to-background hover:border-zinc-400 transition-all hover:scale-105">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-400/20 rounded-full blur-3xl" />

                  <div className="relative pt-16 p-6">
                    {/* Avatar */}
                    <div className="flex justify-center mb-4">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-400 ring-4 ring-zinc-400/20">
                        <Avatar className="w-full h-full">
                          <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {/* Nome e patente */}
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-bold transition-colors mb-2">
                        {topThree[1].name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-zinc-400/20 font-bold"
                      >
                        Suporte
                      </Badge>
                    </div>

                    {/* Bio */}
                    {topThree[1].bio && (
                      <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2 italic min-h-[40px]">
                        {topThree[1].bio}
                      </p>
                    )}

                    {/* Pontos */}
                    <div className="bg-muted/50 rounded-lg p-4 text-center border border-zinc-400/20">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Pontos Semanais
                      </p>
                      <p className="text-2xl font-bold text-zinc-400">
                        {topThree[1].weeklyPoints.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Ícone de medalha */}
                  <div className="absolute top-4 right-4">
                    <MedalIcon className="h-8 w-8 text-zinc-400" />
                  </div>
                </Card>
              </Link>
            </div>

            {/* 1º Lugar - Centro (Mais alto e destacado) */}
            <div className="w-full sm:w-72 lg:w-80 order-1 lg:order-2">
              <Link
                href={`/jogadores/${topThree[0].id}`}
                className="group block"
              >
                <Card className="relative overflow-hidden border-4 border-yellow-500 bg-linear-to-br from-yellow-500/20 via-yellow-500/10 to-background hover:border-yellow-500/80 transition-all hover:scale-105 shadow-2xl shadow-yellow-500/30">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/30 rounded-full blur-3xl" />
                  <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-transparent via-yellow-500 to-transparent" />

                  <div className="relative pt-20 p-8">
                    {/* Avatar - maior */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500 ring-8 ring-yellow-500/30">
                        <Avatar className="w-full h-full">
                          <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {/* Nome e patente */}
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold group-hover:text-yellow-500 transition-colors mb-3">
                        {topThree[0].name}
                      </h3>
                      <Badge className="bg-yellow-500 text-yellow-500-foreground text-sm px-4 py-1 font-bold">
                        Assalto
                      </Badge>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground text-center mb-6 line-clamp-2 italic min-h-[40px]">
                      {topThree[0].bio || "Sem descrição"}
                    </p>

                    {/* Pontos - destaque maior */}
                    <div className="bg-yellow-500/10 rounded-lg p-6 text-center border-2 border-yellow-500/30">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Pontos Semanais
                      </p>
                      <p className="text-4xl font-bold text-yellow-500">
                        {topThree[0].weeklyPoints.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Ícone de coroa - maior */}
                  <div className="absolute top-6 right-6">
                    <Crown className="h-10 w-10 text-yellow-500" />
                  </div>
                </Card>
              </Link>
            </div>

            {/* 3º Lugar - Direita */}
            <div className="w-full sm:w-64 lg:w-72 order-3">
              <Link
                href={`/jogadores/${topThree[2].id}`}
                className="group block"
              >
                <Card className="relative overflow-hidden border-2 border-[#924b2a]/50 bg-linear-to-br from-[#924b2a]/10 to-background hover:border-[#924b2a] transition-all hover:scale-105">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#924b2a]/20 rounded-full blur-3xl" />

                  <div className="relative pt-16 p-6">
                    {/* Avatar */}
                    <div className="flex justify-center mb-4">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#924b2a] ring-4 ring-[#924b2a]/20">
                        <Avatar className="w-full h-full">
                          <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {/* Nome e patente */}
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-bold transition-colors mb-2">
                        {topThree[2].name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-[#924b2a]/20 font-bold"
                      >
                        Engenheiro
                      </Badge>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2 italic min-h-[40px]">
                      {topThree[2].bio || "Sem descrição"}
                    </p>

                    {/* Pontos */}
                    <div className="bg-muted/50 rounded-lg p-4 text-center border border-[#924b2a]/20">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Pontos Semanais
                      </p>
                      <p className="text-2xl font-bold text-[#924b2a]">
                        {topThree[2].weeklyPoints.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Ícone de medalha */}
                  <div className="absolute top-4 right-4">
                    <Award className="h-8 w-8 text-[#924b2a]" />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* Resto do Ranking */}
        <div>
          <h2 className="text-2xl font-bold">Ranking Completo</h2>
          <p className="text-sm text-muted-foreground mb-6">
            O ranking atualiza a cada 10 minutos.
          </p>
          <div className="flex flex-col gap-4 ">
            {restOfPlayers.map((player, index) => {
              const position = index + 4;
              return (
                <Link key={player.id} href={`/jogadores/${player.id}`}>
                  <Card className="p-4 hover:border-primary/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      {/* Posição */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted text-muted-foreground font-bold text-lg shrink-0">
                        #{position}
                      </div>

                      {/* Avatar */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border shrink-0">
                        <Avatar className="w-full h-full">
                          <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold group-hover:text-primary transition-colors truncate">
                            {player.name}
                          </h3>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {player.rank}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate italic">
                          {player.bio || "Sem descrição"}
                        </p>
                      </div>

                      {/* Pontos */}
                      <div className="text-right shrink-0">
                        <p className="text-sm text-muted-foreground">Pontos</p>
                        <p className="text-xl font-bold text-primary">
                          {player.weeklyPoints.toLocaleString()}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
