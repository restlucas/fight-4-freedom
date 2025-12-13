"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { inviteUser } from "@/src/services/user.service";
import { Check, Copy, Loader2 } from "lucide-react";

type ModalStep = "FORM" | "SUCCESS";

type PlayerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};

// -------------- VALIDATION SCHEMA ----------------
const formSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  platform: z.string().min(1, "Campo obrigatório"),
  ea_id: z.string().min(1, "Campo obrigatório"),
  role: z.string().min(1, "Campo obrigatório"),
});

type FormData = z.infer<typeof formSchema>;
type FieldData = ControllerRenderProps<FormData, keyof FormData>;

export function NewPlayerModal({
  open,
  onOpenChange,
  onClose,
}: PlayerModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<ModalStep>("FORM");
  const [inviteLink, setInviteLink] = useState<{
    token: string | null;
    player_name: string | null;
  }>({
    token: null,
    player_name: null,
  });
  const [copied, setCopied] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      platform: "",
      ea_id: "",
      role: "USER",
    },
  });

  const inviteMessage = useMemo(() => {
    if (!inviteLink.player_name || !inviteLink.token) return "";

    return `Olá soldado ${inviteLink.player_name}, você foi convidado para se juntar ao clã F4F.\nEstamos ansiosos para te ver na nossa equipe!\n\nClique neste link para se cadastrar: ${inviteLink.token}`;
  }, [inviteLink]);

  const handleCopyInviteLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteMessage);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);

    try {
      const response = await inviteUser({
        username: values.name,
        name: values.name,
        platform: values.platform,
        ea_id: values.ea_id,
        role: values.role,
      });

      setInviteLink({
        token: response.token,
        player_name: response.player_name,
      });
      setStep("SUCCESS");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open) {
      form.reset();
      setStep("FORM");
      setInviteLink({
        token: null,
        player_name: null,
      });

      return;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle />
        {step === "SUCCESS" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-green-500 text-center text-2xl font-bold">
                Link de convite gerado com sucesso
              </DialogTitle>
              <DialogDescription className="space-y-4 flex flex-col items-center justify-center">
                <p className="mt-4">
                  Copie a mensagem abaixo e envie para o jogador:
                </p>

                <div className="w-full h-auto bg-secondary rounded-md p-4 relative">
                  <div className="space-y-2">
                    <p>
                      Olá soldado {inviteLink.player_name}, você foi convidado
                      para se juntar ao clã F4F.
                    </p>
                    <p>Estamos ansiosos para te ver na nossa equipe!</p>
                    <br />
                    <p>
                      Clique neste link para se cadastrar:{" "}
                      <a
                        href={inviteLink.token || ""}
                        className="text-primary underline text-nowrap"
                      >
                        {inviteLink.token}
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
          </>
        )}

        {step === "FORM" && (
          <>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Jogador</DialogTitle>
              <DialogDescription>
                Preencha os dados básicos. Um link de convite será gerado para o
                jogador acessar o sistema.
              </DialogDescription>
            </DialogHeader>

            {/* ------------------- FORM ------------------- */}
            <Form {...form}>
              <form
                id="user-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 py-4"
              >
                {/* ----------- NAME ----------- */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: { field: FieldData }) => (
                    <FormItem>
                      <FormLabel>
                        Nome do Jogador <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: DarkWolf" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ----------- PLATFORM ----------- */}
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }: { field: FieldData }) => (
                    <FormItem>
                      <FormLabel>
                        Plataforma <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a plataforma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PC">PC</SelectItem>
                          <SelectItem value="PLAYSTATION">
                            PlayStation
                          </SelectItem>
                          <SelectItem value="XBOX">Xbox</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ----------- EA ID ----------- */}
                <FormField
                  control={form.control}
                  name="ea_id"
                  render={({ field }: { field: FieldData }) => (
                    <FormItem>
                      <FormLabel>
                        EA ID <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: DarkWolf#2891" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ----------- ROLE ----------- */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }: { field: FieldData }) => (
                    <FormItem>
                      <FormLabel>
                        Tipo do usuário <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tipo do usuário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USER">Usuário comum</SelectItem>
                          <SelectItem value="ADMIN">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>

              {/* SUBMIT DO FORM */}
              <Button form="user-form" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Gerando link de
                    convite
                  </>
                ) : (
                  "Gerar link de convite"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
