"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { players } from "@/lib/mock-data";
import { Platform } from "@/lib/types";
import { PlayerFilters } from "@/components/players/filters";
import { PlayerCard } from "@/components/players/card";
import { getTopPlayers } from "@/utils/player-stats";

type SortOption = "kd" | "kills" | "revives" | "winRate" | "hoursPlayed";

export default function JogadoresPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("kd");

  const top = useMemo(() => getTopPlayers(players), []);

  const filteredPlayers = useMemo(() => {
    return players
      .filter((p) => {
        const t = searchTerm.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(t) || p.eaId.toLowerCase().includes(t);
        const matchesPlatform =
          platformFilter === "all" || p.platform === platformFilter;
        return matchesSearch && matchesPlatform;
      })
      .sort((a, b) => b.stats[sortBy] - a.stats[sortBy]);
  }, [searchTerm, platformFilter, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-4">
        NOSSOS <span className="text-primary">OPERADORES</span>
      </h1>

      <Card className="p-6 mb-8 border-border">
        <PlayerFilters
          searchTerm={searchTerm}
          platformFilter={platformFilter}
          sortBy={sortBy}
          onSearch={setSearchTerm}
          onPlatformChange={setPlatformFilter}
          onSortChange={setSortBy}
        />
      </Card>

      <div className="grid grid-cols-1 gap-3">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} top={top} />
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <Card className="p-12 text-center border-border">
          Nenhum jogador encontrado.
        </Card>
      )}
    </div>
  );
}
