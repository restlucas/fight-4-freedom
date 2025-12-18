import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  BanIcon,
  CheckIcon,
  ClockIcon,
  Mail,
  Pencil,
  Plus,
  Trash2,
  Users,
  XIcon,
} from "lucide-react";
import { DataFilters } from "../data-filters";
import { userFiltersConfig } from "@/src/utils/filters-config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useState } from "react";
import { Platform, Rank, Role, Status } from "@/src/lib/enums";
import { useUsersInfinite } from "@/src/queries/users/useUsersInfinite";
import { Medal, User } from "@/src/lib/types";
import { Badge } from "@/src/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { PlayerModal } from "./modal";
import { DeletePlayerModal } from "./modal-delete";
import { InviteLink } from "./modal-invite";
import { AssignMedalsDialog } from "../medals/modal-assignee";

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

const getUserRole = (role: Role) => {
  switch (role) {
    case "ADMIN":
      return "Administrador";
    case "USER":
      return "Usuário";
  }
};

export function UsersTab() {
  const [filters, setUserFilters] = useState<{
    username?: string;
    platform?: Platform | "all";
    status?: Status | "all";
    rank?: Rank | "all";
    role?: Role | "all";
  }>({
    username: "",
    platform: "all",
    status: "all",
    rank: "all",
    role: "all",
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsersInfinite({
    filters,
  });

  const players = data?.pages.flatMap((page) => page) ?? [];

  const [selectedPlayer, setSelectedPlayer] = useState<User | null>(null);
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  const [openPlayerModal, setOpenPlayerModal] = useState(false);
  const [openMedalModal, setOpenMedalModal] = useState(false);
  const [openDeletePlayerModal, setOpenDeletePlayerModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const handleNewPlayer = () => {
    setOpenPlayerModal(true);
  };

  const handleCloseModal = () => {
    setOpenPlayerModal(false);
    setOpenMedalModal(false);
    setOpenDeletePlayerModal(false);
    setOpenInviteModal(false);
    setSelectedPlayer(null);
  };

  const handleDeletePlayer = async (player: User) => {
    setOpenDeletePlayerModal(true);
    setSelectedPlayer(player);
  };

  return (
    <>
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
          onChange={setUserFilters}
          config={userFiltersConfig}
        />

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>EA ID</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Tipo</TableHead>
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

                  const userRole = getUserRole(player.role);
                  const enableResendInvite = player.status === "PENDING";

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
                        {userRole}
                      </TableCell>
                      <TableCell>
                        <AssignMedalsDialog player={player} />
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

                          {enableResendInvite && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                setOpenInviteModal(true);
                                setSelectedPlayer(player);
                              }}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          )}

                          {!enableResendInvite && (
                            <>
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
                                onClick={() => handleDeletePlayer(player)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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

      <PlayerModal
        open={openPlayerModal}
        mode={selectedPlayer ? "update" : "create"}
        player={selectedPlayer!}
        onOpenChange={handleCloseModal}
        onClose={() => handleCloseModal()}
      />

      <DeletePlayerModal
        open={openDeletePlayerModal}
        player={selectedPlayer!}
        onOpenChange={handleCloseModal}
        onClose={() => handleCloseModal()}
      />

      <InviteLink
        player={selectedPlayer!}
        open={openInviteModal}
        onOpenChange={handleCloseModal}
        onClose={() => handleCloseModal()}
      />
    </>
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
