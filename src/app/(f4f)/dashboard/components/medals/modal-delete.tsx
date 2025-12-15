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
import { Medal, User } from "@/src/lib/types";
import { useMedalsMutations } from "@/src/queries/medals/useMedalsMutations";
import { useUsersMutations } from "@/src/queries/users/useUsersMutations";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DDeleteMedalModalProps {
  open: boolean;
  medal: Medal;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function DeleteMedalModal({
  open,
  medal,
  onOpenChange,
  onClose,
}: DDeleteMedalModalProps) {
  const { deleteMedal } = useMedalsMutations();
  const [submitting, setSubmitting] = useState(false);

  const handleDeleteMedal = async () => {
    setSubmitting(true);
    try {
      await deleteMedal.mutateAsync(medal.id);
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
            Tem certeza que deseja deletar a medalha{" "}
            <span className="font-bold text-primary">{medal.name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita e irá deletar a medalha e seus
            vínculos permanentemente do servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={submitting}
              onClick={handleDeleteMedal}
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
