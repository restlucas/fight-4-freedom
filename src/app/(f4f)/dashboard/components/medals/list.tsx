import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Pencil, Plus, Trash2, Trophy } from "lucide-react";
import { DataFilters } from "../data-filters";
import { medalFiltersConfig } from "@/src/utils/filters-config";
import { useState } from "react";
import { Rarity } from "@/src/lib/enums";
import { useMedalsInfinite } from "@/src/queries/medals/useMedalsInfinite";
import { Skeleton } from "@/src/components/ui/skeleton";
import { MedalModal } from "./modal";
import { Medal } from "@/src/lib/types";
import { getMedalColor, getMedalRarity } from "@/src/utils/medals";
import { DeleteMedalModal } from "./modal-delete";

export function MedalsTab() {
  const [openMedalModal, setOpenMedalModal] = useState(false);
  const [openDeleteMedalModal, setOpenDeleteMedalModal] = useState(false);
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  const [filters, setFilters] = useState<{
    name?: string;
    rarity?: Rarity | "all";
  }>({
    name: "",
    rarity: "all",
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMedalsInfinite({
    filters,
  });

  const medals = data?.pages.flatMap((page) => page) ?? [];

  const handleNewMedal = () => {
    setOpenMedalModal(true);
  };

  const handleCloseModal = () => {
    setOpenMedalModal(false);
    setOpenDeleteMedalModal(false);
    setSelectedMedal(null);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Gerenciar Medalhas
          </h2>
          <Button onClick={handleNewMedal}>
            <Plus className="h-4 w-4" />
            Nova Medalha
          </Button>
        </div>

        <DataFilters
          filters={filters}
          onChange={setFilters}
          config={medalFiltersConfig}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
              const { border, background, badge, glow } = getMedalColor(
                medal.rarity
              );
              const rarity = getMedalRarity(medal.rarity);

              return (
                <Card
                  key={medal.id}
                  className={`
                    relative overflow-hidden p-4 
                    ${border} 
                    ${background}
                    ${glow}
                    transition-all duration-300 shadow-md
                  `}
                >
                  <div
                    className={`text-sm absolute right-0 top-0 h-auto w-[100px] ${badge} text-white font-bold flex items-center justify-center rounded-bl-md`}
                  >
                    {rarity}
                  </div>

                  <div className="flex items-start gap-4 py-2">
                    <img
                      src={medal.image}
                      alt={medal.name}
                      className="w-24 h-24 object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg truncate">
                          {medal.name}
                        </h3>
                      </div>
                      <p className="text-sm line-clamp-3">
                        {medal.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-3 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedMedal(medal);
                        setOpenMedalModal(true);
                      }}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        setSelectedMedal(medal);
                        setOpenDeleteMedalModal(true);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </Card>

      <MedalModal
        open={openMedalModal}
        mode={selectedMedal ? "update" : "create"}
        medal={selectedMedal}
        onOpenChange={handleCloseModal}
        onClose={() => setOpenMedalModal(false)}
      />

      <DeleteMedalModal
        open={openDeleteMedalModal}
        medal={selectedMedal!}
        onOpenChange={handleCloseModal}
        onClose={() => setOpenDeleteMedalModal(false)}
      />
    </>
  );
}

function MedalSkeleton() {
  return (
    <Card className="p-4 border-border">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10" />
      </div>
    </Card>
  );
}
