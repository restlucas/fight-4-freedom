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
import { useMedalsMutations } from "@/src/queries/medals/useMedalsMutations";
import { useMedalsPaginated } from "@/src/queries/medals/useMedalsPaginate";
import { Award, Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function AssignMedalsDialog({ player }: { player: User }) {
  const { assignMedals } = useMedalsMutations();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [toAssign, setToAssign] = useState<Set<string>>(new Set());
  const [toUnassign, setToUnassign] = useState<Set<string>>(new Set());

  const hasAssignedChanges = toUnassign.size > 0;
  const hasUnassignedChanges = toAssign.size > 0;

  const [filters, setFilters] = useState<MedalsFilters>({
    name: "",
    page: 1,
    size: 12,
    assignee: player.id,
    assigned: true,
  });

  const { data, isLoading, isFetching } = useMedalsPaginated({ filters });

  const medals = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;
  const currentPage = data?.page ?? 1;

  const selectedMedals = useMemo(() => {
    const selected = new Set<string>();

    medals.forEach((medal) => {
      if (filters.assigned) {
        selected.add(medal.id);

        if (toUnassign.has(medal.id)) {
          selected.delete(medal.id);
        }
      } else {
        if (toAssign.has(medal.id)) {
          selected.add(medal.id);
        }
      }
    });

    return selected;
  }, [medals, filters.assigned, toAssign, toUnassign]);

  const toggleMedal = (medalId: string) => {
    if (filters.assigned) {
      setToUnassign((prev) => {
        const next = new Set(prev);
        next.has(medalId) ? next.delete(medalId) : next.add(medalId);
        return next;
      });
    } else {
      setToAssign((prev) => {
        const next = new Set(prev);
        next.has(medalId) ? next.delete(medalId) : next.add(medalId);
        return next;
      });
    }
  };

  const onSubmit = async () => {
    setSubmitting(true);

    try {
      const payload = {
        userId: player.id,
        assign: Array.from(toAssign),
        unassign: Array.from(toUnassign),
      };

      await assignMedals.mutateAsync(payload);
      setToAssign(new Set());
      setToUnassign(new Set());
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open) {
      setToAssign(new Set());
      setToUnassign(new Set());
      setFilters({
        name: "",
        page: 1,
        size: 9,
        assignee: player.id,
        assigned: true,
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Award className="h-4 w-4" />
          Medalhas ({player.userMedals.length})
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
            className="max-sm:w-full w-auto lg:min-w-[300px]"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />

          <Button
            variant="outline"
            onClick={() => setFilters({ ...filters, assigned: true })}
            className={`relative ${
              filters.assigned === true
                ? "bg-primary text-white"
                : "bg-transparent"
            }`}
          >
            Atribuídas
            {hasAssignedChanges && (
              <div className="absolute -top-1 -right-1">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-white" />
                </span>
              </div>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilters({ ...filters, assigned: false })}
            className={`relative ${
              filters.assigned === false
                ? "bg-primary text-white"
                : "bg-transparent"
            }`}
          >
            Não atribuídas
            {hasUnassignedChanges && (
              <div className="absolute -top-1 -right-1">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-white" />
                </span>
              </div>
            )}
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
              const isSelected = selectedMedals.has(medal.id);

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

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages} ({total} medalhas)
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage <= 1}
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: currentPage - 1 }))
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: currentPage + 1 }))
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={submitting}>
            {submitting ? (
              <>
                Salvando alterações
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Salvar alterações{" "}
                {hasAssignedChanges || hasUnassignedChanges
                  ? `(${toAssign.size + toUnassign.size} alteraç${
                      toAssign.size + toUnassign.size > 1 ? "ões" : "ão"
                    })`
                  : ""}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
