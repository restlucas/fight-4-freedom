"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/src/store/useAuth";
import { User } from "@/src/lib/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { ProtectedRoute } from "@/src/components/protected-route";
import { getInitials } from "@/src/utils/string";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { alertToast } from "@/src/lib/alert-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUsersMutations } from "@/src/queries/users/useUsersMutations";

const formSchema = z.object({
  id: z.string(),
  ea_id: z.string(),
  bio: z.string().min(1).max(200).optional(),
});

type FormValues = z.infer<typeof formSchema>;

function PerfilContent({ user }: { user: User }) {
  const { updateUser } = useUsersMutations();
  const { name, bio, avatar, platform, ea_id, createdAt } = user;

  const { updateUser: updateUserStore } = useAuth();
  const [submitting, setSubmiting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user.id,
      ea_id: ea_id,
      bio: bio ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmiting(true);

    try {
      const response = await updateUser.mutateAsync(data);
      updateUserStore(response.user);
      alertToast.success("Perfil atualizado com sucesso");
    } catch (error) {
      alertToast.error("Erro ao atualizar perfil. Tente novamente mais tarde.");
      console.error(error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Meu Perfil</h1>
            <p className="mt-1">
              Clique nos campos para editar suas informações
            </p>
          </div>

          <Card className="p-8 space-y-8">
            <div className="flex flex-col items-center gap-4">
              <p>
                Por aqui desde{" "}
                <span className="font-semibold">
                  {new Date(createdAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>

              <div className="relative group">
                <Avatar className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary transition-all group-hover:border-primary">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="text-4xl font-bold">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                {/* <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary hover:bg-primary flex items-center justify-center cursor-pointer transition-all shadow-lg"
                title="Alterar foto"
              >
                <Camera className="h-5 w-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label> */}
              </div>
              {/* <p>Clique no ícone para alterar sua foto</p> */}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-muted-foreground uppercase tracking-wider font-semibold">
                  Nome de Exibição
                </label>
                <p className="font-bold text-2xl">{name}</p>
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground uppercase tracking-wider font-semibold">
                      Biografia
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conte um pouco sobre você e seu estilo de jogo"
                        {...field}
                        maxLength={200}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      Salvando <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </div>

              <div className="pt-6 border-t border-border/40 space-y-4">
                <h3 className="font-semibold text-muted-foreground uppercase tracking-wider">
                  Informações do Jogo
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1">EA ID</p>
                    <p className="font-mono">{ea_id}</p>
                  </div>

                  <div>
                    <p className="mb-1">Plataforma</p>
                    <p className="font-mono">{platform}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default function PerfilPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole={["ADMIN", "USER"]}>
      <PerfilContent user={user} />
    </ProtectedRoute>
  );
}
