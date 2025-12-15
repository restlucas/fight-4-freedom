import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { User } from "@/src/lib/types";
import { inviteService } from "@/src/services/invite.service";
import { Check, Copy, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface InviteModalProps {
  player: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function InviteLink({
  player,
  open,
  onOpenChange,
  onClose,
}: InviteModalProps) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(true);

  const [invite, setInvite] = useState<{
    link: string;
    playerName: string;
  } | null>(null);

  const inviteMessage = useMemo(() => {
    if (!player || !invite) return "";

    return `Olá soldado ${invite?.playerName}, você foi convidado para se juntar ao clã F4F.\nEstamos ansiosos para te ver na nossa equipe!\n\nClique neste link para se cadastrar: ${invite?.link}`;
  }, [invite]);

  const generateInviteLink = async (player: User) => {
    const response = await inviteService.generate(player.ea_id);

    setInvite({
      link: response.invite_link,
      playerName: response.player_name,
    });

    setGenerating(false);
  };

  const handleCopyInviteLink = () => {
    if (invite) {
      navigator.clipboard.writeText(inviteMessage);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (open && player) {
      generateInviteLink(player);
    }
  }, [open, player]);

  if (!open || !player) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle />
      <DialogContent className="sm:max-w-[500px]">
        {generating ? (
          <div className="w-full py-10 flex flex-col items-center justify-center gap-3">
            <p className="text-lg font-bold">Obtendo link de convite</p>
            <Loader2 className="size-10 w-10 h-10 animate-spin" />
          </div>
        ) : (
          <DialogHeader>
            <DialogTitle className="text-green-500 text-center text-2xl font-bold">
              Link de convite
            </DialogTitle>
            <DialogDescription className="space-y-4 flex flex-col items-center justify-center">
              <p className="mt-4">
                Copie a mensagem abaixo e envie para o jogador:
              </p>

              <div className="w-full h-auto bg-secondary rounded-md p-4 relative">
                <div className="space-y-2">
                  <p>
                    Olá soldado {player.name}, você foi convidado para se juntar
                    ao clã F4F.
                  </p>
                  <p>Estamos ansiosos para te ver na nossa equipe!</p>
                  <br />
                  <p>
                    Clique neste link para se cadastrar:{" "}
                    <a
                      href={invite?.link}
                      target="_blank"
                      className="text-primary underline"
                    >
                      {invite?.link}
                    </a>
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyInviteLink}
                className="ml-auto w-auto px-4 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="size-6 w-4 h-4" />
                    <span>Mensagem copiada</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-6 w-4 h-4" />
                    <span>Copiar mensagem</span>
                  </>
                )}
              </Button>
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}
