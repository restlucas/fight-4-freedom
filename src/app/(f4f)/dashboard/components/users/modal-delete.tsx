import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { User } from "@/src/lib/types";
import { useUsersMutations } from "@/src/queries/users/useUsersMutations";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeletePlayerModalprops {
  open: boolean;
  player: User;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function DeletePlayerModal({
  open,
  player,
  onOpenChange,
  onClose,
}: DeletePlayerModalprops) {
  const { deleteUser } = useUsersMutations();
  const [submitting, setSubmitting] = useState(false);

  const handleDeletePlayer = async () => {
    setSubmitting(true);
    try {
      await deleteUser.mutateAsync(player.username);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar o jogador{" "}
            <span className="font-bold text-primary">{player.name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Esta ação irá deletar o jogador
            permanentemente e remover os dados do servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={submitting}
              onClick={handleDeletePlayer}
              variant="destructive"
            >
              {submitting ? (
                <>
                  <span>Deletando...</span>
                  <Loader2 className="size-4 animate-spin" />
                </>
              ) : (
                "Deletar"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
