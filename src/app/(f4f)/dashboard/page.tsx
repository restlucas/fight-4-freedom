"use client";

import { useState } from "react";
import { Card } from "@/src/components/ui/card";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";

import { Badge } from "@/src/components/ui/badge";
import {
  Users,
  Trophy,
  Plus,
  Pencil,
  Trash2,
  Award,
  CheckIcon,
  XIcon,
  ClockIcon,
  BanIcon,
} from "lucide-react";
import { medals } from "@/src/lib/mock-data";
import { NewPlayerModal } from "./components/new-player-modal";
import { MedalModal } from "./components/medal-modal";
import { Medal, User } from "@/src/lib/types";
import { ProtectedRoute } from "@/src/components/protected-route";
import { useUsersInfinite } from "@/src/hooks/useUsers";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { DataFilters } from "./components/data-filters";
import { userFiltersConfig } from "@/src/utils/filters-config";
import { Platform, Rank, Status } from "@/src/lib/enums";

const getPlayerStatus = (status: Status) => {
  switch (status) {
    case "ACTIVE":
      return <CheckIcon className="h-4 w-4 text-emerald-500" />;
    case "INACTIVE":
      return <XIcon className="h-4 w-4 text-red-500" />;
    case "PENDING":
      return <ClockIcon className="h-4 w-4 text-yellow-500" />;
    case "BANNED":
      return <BanIcon className="h-4 w-4 text-red-500" />;
  }
};

const getPlayerStatusTooltip = (status: Status) => {
  switch (status) {
    case "ACTIVE":
      return "Jogador ativo";
    case "INACTIVE":
      return "Jogador inativo";
    case "PENDING":
      return "Jogador ainda não se cadastrou no sistema";
    case "BANNED":
      return "Jogador banido";
  }
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"players" | "medals">("players");

  const [filters, setFilters] = useState<{
    username?: string;
    platform?: Platform | "all";
    status?: Status | "all";
    rank?: Rank | "all";
  }>({
    username: "",
    platform: "all",
    status: "all",
    rank: "all",
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsersInfinite({
    content: activeTab,
    filters,
  });

  const players = data?.pages.flatMap((page) => page) ?? [];

  const [selectedPlayer, setSelectedPlayer] = useState<User | null>(null);
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  const [openPlayerModal, setOpenPlayerModal] = useState(false);
  const [openMedalModal, setOpenMedalModal] = useState(false);

  const handleNewPlayer = () => {
    setOpenPlayerModal(true);
  };

  const handleNewMedal = () => {
    setOpenMedalModal(true);
  };

  const handleClosePlayerModal = () => {
    setOpenPlayerModal(false);
    setSelectedPlayer(null);
  };

  const handleCloseMedalModal = () => {
    setOpenMedalModal(false);
    setSelectedMedal(null);
  };

  return (
    <ProtectedRoute requiredRole={["ADMIN"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard Administrativo</h1>
          <p>Gerencie jogadores, medalhas e atribuições do clã</p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "players" | "medals")}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="players" className="gap-2">
              <Users className="h-4 w-4" />
              Jogadores
            </TabsTrigger>
            <TabsTrigger value="medals" className="gap-2">
              <Trophy className="h-4 w-4" />
              Medalhas
            </TabsTrigger>
          </TabsList>

          {/* Players CRUD */}
          <TabsContent value="players" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Gerenciar Jogadores
                </h2>
                <Button onClick={handleNewPlayer}>
                  <Plus className="h-4 w-4" />
                  Novo Jogador
                </Button>
              </div>

              <DataFilters
                filters={filters}
                onChange={setFilters}
                config={userFiltersConfig}
              />

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>EA ID</TableHead>
                      <TableHead>Plataforma</TableHead>
                      <TableHead>Tracker.gg</TableHead>
                      <TableHead>Medalhas</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      Array.from({ length: 10 }).map((_, index) => (
                        <PlayerSkeleton key={index} />
                      ))
                    ) : players.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          Nenhum jogador encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      players.map((player) => {
                        const playerStatus = getPlayerStatus(player.status);
                        const playerStatusTooltip = getPlayerStatusTooltip(
                          player.status
                        );

                        return (
                          <TableRow key={player.id}>
                            <TableCell className="font-semibold">
                              {player.name}
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {player.ea_id}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{player.platform}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              tracker.gg/bf6/{player.ea_id}
                            </TableCell>
                            <TableCell>
                              <AssignMedalsDialog
                                playerId={player.id.toString()}
                                playerName={player.name}
                                currentMedals={player.medals}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <div className="flex items-center justify-center w-7 h-7 bg-emerald-500/10 rounded-full mr-2">
                                      {playerStatus}
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-auto">
                                    <p>{playerStatusTooltip}</p>
                                  </HoverCardContent>
                                </HoverCard>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setOpenPlayerModal(true);
                                    setSelectedPlayer(player);
                                  }}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Medals CRUD */}
          <TabsContent value="medals" className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medals.map((medal) => (
                  <Card key={medal.id} className="p-4 border-border">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{medal.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold truncate">{medal.name}</h3>
                          <Badge
                            variant="outline"
                            className="capitalize text-xs shrink-0"
                          >
                            {medal.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {medal.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 px-2"
                          >
                            <Pencil className="h-3 w-3" />
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 px-2 text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <NewPlayerModal
          open={openPlayerModal}
          onOpenChange={handleClosePlayerModal}
          onClose={() => setOpenPlayerModal(false)}
        />

        <MedalModal
          open={openMedalModal}
          medal={selectedMedal}
          onOpenChange={handleCloseMedalModal}
          onClose={() => setOpenMedalModal(false)}
        />
      </div>
    </ProtectedRoute>
  );
}

function AssignMedalsDialog({
  playerId,
  playerName,
  currentMedals,
}: {
  playerId: string;
  playerName: string;
  currentMedals: string[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedMedals, setSelectedMedals] = useState<string[]>(currentMedals);

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
          {currentMedals.length > 0 ? (
            <span className="text-sm">{currentMedals.length} medalhas</span>
          ) : (
            <span className="text-sm">Nenhuma medalha</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogTitle />
        <DialogHeader>
          <DialogTitle>Atribuir Medalhas - {playerName}</DialogTitle>
          <DialogDescription>
            Clique nas medalhas para atribuir ou remover do jogador
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
          {medals.map((medal) => {
            const isSelected = selectedMedals.includes(medal.id);
            return (
              <button
                key={medal.id}
                onClick={() => toggleMedal(medal.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-[1.02] ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{medal.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">
                        {medal.name}
                      </h4>
                      {isSelected && (
                        <Badge variant="default" className="text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {medal.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
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

function PlayerSkeleton() {
  return (
    <TableRow>
      {/* Nome */}
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>

      {/* EA ID */}
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>

      {/* Plataforma */}
      <TableCell>
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>

      {/* Tracker link */}
      <TableCell>
        <Skeleton className="h-4 w-48" />
      </TableCell>

      {/* Medals */}
      <TableCell>
        <Skeleton className="h-8 w-28 rounded-md" />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Status */}
          <Skeleton className="h-7 w-7 rounded-full mr-2" />

          {/* Edit */}
          <Skeleton className="h-8 w-8 rounded-md" />

          {/* Delete */}
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  );
}
