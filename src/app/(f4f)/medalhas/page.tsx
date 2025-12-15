"use client";

import { useMemo, useState } from "react";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Trophy, Target, Award, Crown } from "lucide-react";
import { useMedalsInfinite } from "@/src/queries/medals/useMedalsInfinite";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getMedalColor, getMedalRarity } from "@/src/utils/medals";
import { Button } from "@/src/components/ui/button";
import { Rarity } from "@/src/lib/enums";
import { MedalCard } from "@/src/components/medal-card";

const medalRarityFiltersConfig = [
  {
    label: "Todas",
    value: "all",
  },
  {
    label: "Comuns",
    value: "COMMON",
  },
  {
    label: "Raras",
    value: "RARE",
  },
  {
    label: "Epicas",
    value: "EPIC",
  },
  {
    label: "Lendárias",
    value: "LEGENDARY",
  },
  {
    label: "Únicas",
    value: "UNIQUE",
  },
];

export default function MedalhasPage() {
  const [filters, setFilters] = useState<{
    rarity?: Rarity | "all";
  }>({
    rarity: "all",
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMedalsInfinite({ filters });

  const medals = data?.pages.flatMap((page) => page) ?? [];

  const medalsStats = useMemo(() => {
    if (!medals)
      return { total: 0, unique: 0, legendary: 0, epic: 0, rare: 0, common: 0 };

    return {
      total: medals.length,
      unique: medals.filter((m) => m.rarity === "UNIQUE").length,
      legendary: medals.filter((m) => m.rarity === "LEGENDARY").length,
      epic: medals.filter((m) => m.rarity === "EPIC").length,
      rare: medals.filter((m) => m.rarity === "RARE").length,
      common: medals.filter((m) => m.rarity === "COMMON").length,
    };
  }, [medals]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="mb-8">
        <h1 className="text-5xl md:text-5xl font-bold mb-4">
          SISTEMA DE <span className="text-primary">MEDALHAS</span>
        </h1>
        <p className="text-lg">
          Conquiste medalhas exclusivas demonstrando habilidade e dedicação no
          campo de batalha. Cada medalha representa um feito único e desafiador.
        </p>
      </div>

      {/* Filtro por rarida */}
      <div className="flex items-center flex-wrap gap-4">
        {medalRarityFiltersConfig.map((filter) => (
          <Button
            variant={filters.rarity === filter.value ? "default" : "outline"}
            onClick={() =>
              setFilters({ rarity: filter.value as Rarity | "all" })
            }
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Filtro por Raridade */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MedalSkeleton key={index} />
          ))
        ) : medals.length === 0 ? (
          <div className="text-center py-6 w-full col-span-full">
            Nenhuma medalha encontrada
          </div>
        ) : (
          medals.map((medal) => {
            return <MedalCard key={medal.id} medal={medal} />;
          })
        )}
      </div>

      {/* Informações Adicionais */}
      <Card className="p-8 border-border bg-card/50">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-6 w-6 text-primary" />
          Como Funciona o Sistema de Medalhas
        </h2>
        <div className="space-y-4 text-xl">
          <p className="leading-relaxed">
            As medalhas são conquistas exclusivas do clã que reconhecem feitos
            extraordinários no Battlefield 6. Cada medalha possui critérios
            específicos que devem ser comprovados através de screenshots ou
            gravações. É possível reinvindicar medalhas usando o canal
            "medalhas-solicitação" no discord do clã.
          </p>
        </div>
      </Card>
    </div>
  );
}

function MedalSkeleton() {
  return (
    <Card className="p-4 border-border gap-3 relative h-[348px] w-full">
      <Skeleton className="absolute top-4 right-4 w-[70px] h-[22px] rounded-xl" />

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <Skeleton className="w-32 h-32 rounded-full" />
        <Skeleton className="h-6 w-[100px] rounded-xl" />
      </div>

      <Skeleton className="w-full h-[78px] rounded-xl" />
    </Card>
  );
}
