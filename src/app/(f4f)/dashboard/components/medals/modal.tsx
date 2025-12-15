"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { Medal } from "@/src/lib/types";
import { useEffect, useState } from "react";
import { Rarity } from "@/src/lib/enums";
import { Image } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useMedalsMutations } from "@/src/queries/medals/useMedalsMutations";

interface MedalModalProps {
  medal: Medal | null;
  open: boolean;
  mode?: "create" | "update";
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatório" }),
  image: z.string().min(1).optional(),
  rarity: z.enum(["COMMON", "RARE", "EPIC", "LEGENDARY", "UNIQUE"]),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  name: "",
  description: "",
  image: "https://imagepng.org/wp-content/uploads/2017/10/bola.png",
  rarity: "COMMON" as Rarity,
};

export function MedalModal({
  medal,
  open,
  mode = "create",
  onOpenChange,
  onClose,
}: MedalModalProps) {
  const { createMedal, updateMedal } = useMedalsMutations();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    const mutateMedal = mode === "create" ? createMedal : updateMedal;

    try {
      await mutateMedal.mutateAsync({
        ...(mode === "update" && { id: medal?.id }),
        ...data,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      if (medal) {
        form.reset(medal);
      } else {
        form.reset(defaultValues);
      }
    }
  }, [open, medal]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Medalha</DialogTitle>
          <DialogDescription>
            Defina a imagem, nome e descrição da medalha personalizada
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="medal-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <div className="space-y-2 flex flex-col items-center gap-2">
              <div className="rounded-full border border-border bg-background h-20 w-20 flex items-center justify-center">
                <Image />
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome da medalha<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Sniper Elite" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rarity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raridade</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="rarity" className="w-full">
                        <SelectValue placeholder="Selecione a raridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COMMON">Comum</SelectItem>
                        <SelectItem value="RARE">Raro</SelectItem>
                        <SelectItem value="EPIC">Épico</SelectItem>
                        <SelectItem value="LEGENDARY">Lendário</SelectItem>
                        <SelectItem value="UNIQUE">Único</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descrição <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o desafio da medalha..."
                      {...field}
                    />
                  </FormControl>
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
          <Button type="submit" form="medal-form">
            Criar Medalha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
