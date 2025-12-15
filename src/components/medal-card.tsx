import { Trophy } from "lucide-react";
import { Medal } from "../lib/types";
import { getMedalColor, getMedalRarity } from "../utils/medals";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export function MedalCard({ medal }: { medal: Medal }) {
  const { border, background, badge, glow } = getMedalColor(medal.rarity);
  const rarity = getMedalRarity(medal.rarity);

  return (
    <Card
      key={medal.id}
      className={`p-4 relative border-border ${border} ${background} ${glow} gap-4`}
    >
      <Badge
        className={`absolute top-4 right-4 capitalize text-white ${badge}`}
      >
        {rarity}
      </Badge>

      <div className="flex flex-col items-center justify-between gap-4 w-full">
        <img
          src={medal.image}
          alt={medal.name}
          className="w-32 h-32 object-cover"
        />
        <h3 className="font-bold text-lg">{medal.name}</h3>
      </div>

      <Card className="py-2 px-4 bg-background/50 border-border gap-2">
        <div className="mb-1 font-semibold">Como obter:</div>
        <p>{medal.description}</p>
      </Card>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">Conquistada por:</span>
        </div>

        <div className="text-right font-bold">0% do clã</div>
      </div>
    </Card>
  );
}
