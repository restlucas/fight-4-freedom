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
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useUsersMutations } from "@/src/queries/users/useUsersMutations";
import { User } from "@/src/lib/types";

type PlayerModalProps = {
  open: boolean;
  mode?: "create" | "update";
  player?: User;
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

const defaultValues = {
  name: "",
  platform: "",
  ea_id: "",
  role: "USER",
};

export function PlayerModal({
  open,
  mode = "create",
  player,
  onOpenChange,
  onClose,
}: PlayerModalProps) {
  const { preRegisterUser, updateUser } = useUsersMutations();

  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    const mutateUser = mode === "create" ? preRegisterUser : updateUser;

    try {
      await mutateUser.mutateAsync({
        ...(mode === "update" && { id: player?.id }),
        username: values.name,
        name: values.name,
        platform: values.platform,
        ea_id: values.ea_id,
        role: values.role,
      });

      onClose();
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setSubmitting(false);

    if (mode === "update" && player) {
      form.reset({
        name: player?.name || "",
        platform: player?.platform || "",
        ea_id: player?.ea_id || "",
        role: player?.role || "USER",
      });
      return;
    }

    form.reset(defaultValues);
  }, [open, mode, player]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle />

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
                      <SelectItem value="PLAYSTATION">PlayStation</SelectItem>
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
      </DialogContent>
    </Dialog>
  );
}
