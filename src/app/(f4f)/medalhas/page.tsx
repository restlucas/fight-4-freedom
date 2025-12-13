"use client";

import { useState } from "react";
import { medals } from "@/src/lib/mock-data";
import { players } from "@/src/lib/mock-data";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Trophy, Target, Award, Crown } from "lucide-react";

type Rarity = "todas" | "lendario" | "epico" | "raro" | "comum";

export default function MedalhasPage() {
  const [selectedRarity, setSelectedRarity] = useState<Rarity>("todas");

  const filteredMedals = medals.filter(
    (medal) => selectedRarity === "todas" || medal.rarity === selectedRarity
  );

  const rarityColors = {
    lendario: {
      bg: "bg-chart-4/20 border-chart-4",
      text: "text-chart-4",
      icon: "🏆",
    },
    epico: {
      bg: "bg-chart-3/20 border-chart-3",
      text: "text-chart-3",
      icon: "💎",
    },
    raro: {
      bg: "bg-chart-2/20 border-chart-2",
      text: "text-chart-2",
      icon: "⭐",
    },
    comum: {
      bg: "bg-muted/50 border-muted-foreground/30",
      text: "text-muted-foreground",
      icon: "🎖️",
    },
  };

  const getMedalStats = (medalId: string) => {
    const playersWithMedal = players.filter((player) =>
      player.medals.includes(medalId)
    );
    return {
      count: playersWithMedal.length,
      percentage: ((playersWithMedal.length / players.length) * 100).toFixed(1),
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-5xl md:text-5xl font-bold mb-4">
          SISTEMA DE <span className="text-primary">MEDALHAS</span>
        </h1>
        <p className="text-lg">
          Conquiste medalhas exclusivas demonstrando habilidade e dedicação no
          campo de batalha. Cada medalha representa um feito único e desafiador.
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 border-border gap-3">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="h-8 w-8 text-primary" />
            <div className="text-4xl font-bold">{medals.length}</div>
          </div>
          <div className="text-lg">Total de Medalhas</div>
        </Card>

        <Card className="p-4 border-border gap-3">
          <div className="flex items-center justify-between mb-2">
            <Crown className="h-8 w-8 text-chart-4" />
            <div className="text-4xl font-bold">
              {medals.filter((m) => m.rarity === "lendario").length}
            </div>
          </div>
          <div className="text-lg">Lendárias</div>
        </Card>

        <Card className="p-4 border-border gap-3">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 text-chart-3" />
            <div className="text-4xl font-bold">
              {medals.filter((m) => m.rarity === "epico").length}
            </div>
          </div>
          <div className="text-lg">Épicas</div>
        </Card>

        <Card className="p-4 border-border gap-3">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-8 w-8 text-chart-2" />
            <div className="text-4xl font-bold">
              {medals.filter((m) => m.rarity === "epico").length}
            </div>
          </div>
          <div className="text-lg">Raras</div>
        </Card>
      </div>

      {/* Filtro por Raridade */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedals.map((medal) => {
          const stats = getMedalStats(medal.id);
          return (
            <Card
              key={medal.id}
              className={`p-4 border ${rarityColors[medal.rarity].bg} gap-4`}
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{medal.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{medal.name}</h3>
                    <Badge className="capitalize ml-2 text-white">
                      {medal.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm mb-1">{medal.description}</p>
                </div>
              </div>

              <Card className="p-4 bg-background/50 border-border gap-2">
                <div className="mb-1 font-semibold">CRITÉRIOS PARA OBTER:</div>
                <p>{medal.criteria}</p>
              </Card>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg">Conquistada por:</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {stats.count} jogador{stats.count !== 1 ? "es" : ""}
                  </div>
                  <div className="text-lg">{stats.percentage}% do clã</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredMedals.length === 0 && (
        <Card className="p-12 text-center border-border">
          <p className="text-muted-foreground">
            Nenhuma medalha encontrada nesta categoria.
          </p>
        </Card>
      )}

      {/* Informações Adicionais */}
      <Card className="p-8 border-border bg-card/50 mt-12">
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
