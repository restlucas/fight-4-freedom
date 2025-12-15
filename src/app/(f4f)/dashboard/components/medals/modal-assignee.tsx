import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Skeleton } from "@/src/components/ui/skeleton";
import { User } from "@/src/lib/types";
import { MedalsFilters } from "@/src/queries/medals/medals.queryKeys";
import { useMedalsPaginated } from "@/src/queries/medals/useMedalsPaginate";
import { Award, Check } from "lucide-react";
import { useState } from "react";

export function AssignMedalsDialog({ player }: { player: User }) {
  const [open, setOpen] = useState(false);
  const [selectedMedals, setSelectedMedals] = useState<string[]>([]);

  const [filters, setFilters] = useState<MedalsFilters>({
    name: "",
    page: 1,
    size: 12,
    assignee: player.id,
    assigned: true,
  });

  const { data, isLoading, isFetching } = useMedalsPaginated({
    filters,
  });

  const medals = data ?? [];

  const toggleMedal = (medalId: string) => {
    setSelectedMedals((prev) =>
      prev.includes(medalId)
        ? prev.filter((id) => id !== medalId)
        : [...prev, medalId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Award className="h-4 w-4" />
          Medalhas (0)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Atribuir Medalhas à{" "}
            <span className="font-semibold text-primary">{player.name}</span>
          </DialogTitle>
          <DialogDescription>
            Clique nas medalhas para atribuir ou remover do jogador
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Pesquisar medalhas"
            className="w-auto lg:min-w-[300px]"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />

          <Button
            variant="outline"
            onClick={() => setFilters({ ...filters, assigned: true })}
            className={
              filters.assigned === true
                ? "bg-primary text-white"
                : "bg-transparent"
            }
          >
            Atribuídas
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilters({ ...filters, assigned: false })}
            className={
              filters.assigned === false
                ? "bg-primary text-white"
                : "bg-transparent"
            }
          >
            Não atribuídas
          </Button>
        </div>

        <div className="flex items-center justify-between"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 py-4">
          {isLoading || isFetching ? (
            Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="*:p-4 group rounded-lg border-2 text-left transition-all hover:scale-[1.02] border-border hover:border-primary/50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Skeleton className="w-10 h-6" />
                    </div>
                    <Skeleton className="w-full h-4 mt-2" />
                    <Skeleton className="w-1/2 h-4 mt-1" />
                  </div>
                </div>
              </div>
            ))
          ) : medals.length === 0 ? (
            <div className="col-span-full h-14 flex items-center justify-center text-center text-muted-foreground">
              Nenhuma medalha encontrada
            </div>
          ) : (
            medals.map((medal) => {
              const isSelected = selectedMedals.includes(medal.id);
              return (
                <button
                  key={medal.id}
                  onClick={() => toggleMedal(medal.id)}
                  className={`p-4 group rounded-lg border-2 text-left transition-all hover:scale-[1.02] ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold truncate group-hover:text-primary duration-300">
                          {medal.name}
                        </h4>
                        {isSelected && (
                          <Badge
                            variant="default"
                            className="text-xs text-white"
                          >
                            <Check className="h-4 w-4" />
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{medal.description}</p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setOpen(false)}>
            Salvar Alterações ({selectedMedals.length} medalhas)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
