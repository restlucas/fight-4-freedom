"use client";

import { useState, useMemo } from "react";
import { Card } from "@/src/components/ui/card";
import { PlayerFilters } from "./components/filters";
import { PlayerCard } from "./components/card";
import { getTopPlayers } from "@/src/utils/player-stats";
import { useUsersInfinite } from "@/src/queries/users/useUsersInfinite";

type SortOption =
  | "kd"
  | "kills"
  | "revives"
  | "wins"
  | "losses"
  | "hoursPlayed";

export default function JogadoresPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("kd");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsersInfinite({
    defaultFilters: { status: "ACTIVE" },
  });

  const players = data?.pages.flatMap((page) => page) ?? [];

  const top = useMemo(() => {
    if (!players || players.length === 0) return null;
    return getTopPlayers(players);
  }, [players]);

  const filteredPlayers = useMemo(() => {
    return players
      .filter((p) => {
        const t = searchTerm.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(t) ||
          p.username.toLowerCase().includes(t);
        const matchesPlatform =
          platformFilter === "all" || p.platform === platformFilter;
        return matchesSearch && matchesPlatform;
      })
      .sort((a, b) => {
        const aVal = (a.userStats[0]?.[sortBy] as number) ?? 0;
        const bVal = (b.userStats[0]?.[sortBy] as number) ?? 0;
        return bVal - aVal;
      });
  }, [players, searchTerm, platformFilter, sortBy]);

  if (error)
    return <Card className="p-12 text-center">Erro ao carregar usuários.</Card>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-4">
          NOSSOS <span className="text-primary">OPERADORES</span>
        </h1>
        <p className="text-lg">
          Explore os perfis de nossos operadores, veja suas estatísticas e
          conquistas.
        </p>
      </div>

      <Card className="p-6 mb-8 border-border">
        <PlayerFilters
          searchTerm={searchTerm}
          platformFilter={platformFilter as any}
          sortBy={sortBy}
          onSearch={setSearchTerm}
          onPlatformChange={setPlatformFilter}
          onSortChange={setSortBy}
        />
      </Card>

      <div className="grid grid-cols-1 gap-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonPlayers key={i} />)
        ) : filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} top={top} />
          ))
        ) : (
          <Card className="p-12 text-center border-border">
            Nenhum jogador encontrado.
          </Card>
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
          >
            {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}
    </div>
  );
}

const SkeletonPlayers = () => {
  return (
    <Card className="p-4 border-border">
      <div className="flex items-start justify-center gap-6">
        {/* Avatar + Badge */}
        <div className="flex items-center gap-2 flex-col">
          <div className="animate-pulse w-32 h-32 rounded-lg bg-muted-foreground/20 border-2 border-primary/30" />
          <div className="animate-pulse h-6 w-16 bg-muted-foreground/30 rounded" />
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0 h-full">
          {/* Nome + Rank */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4">
                <div className="animate-pulse h-8 bg-muted-foreground/30 rounded w-48" />
                <div className="animate-pulse w-8 h-8 rounded bg-muted-foreground/30" />
              </div>

              {/* EA ID */}
              <div className="flex items-center gap-2 mt-2">
                <div className="animate-pulse h-4 w-24 bg-muted-foreground/30 rounded" />
                <div className="animate-pulse w-8 h-8 rounded bg-muted-foreground/30" />
              </div>

              {/* Bio */}
              <div className="mt-4 space-y-2">
                <div className="animate-pulse h-3 w-full bg-muted-foreground/20 rounded" />
                <div className="animate-pulse h-3 w-5/6 bg-muted-foreground/20 rounded" />
                <div className="animate-pulse h-3 w-3/4 bg-muted-foreground/20 rounded" />
              </div>
            </div>
          </div>

          {/* PlayerStats Skeleton */}
          <div className="mt-2 flex gap-4">
            {Array.from({ length: 6 }).map((_, j) => (
              <div
                key={j}
                className="animate-pulse h-4 w-12 bg-muted-foreground/20 rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
