"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Loader2, Target } from "lucide-react";
import { validateInvite } from "@/src/services/invite.service";
import { useEffect, useRef, useState } from "react";
import { alertToast } from "@/src/lib/alert-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { registerUser } from "@/src/services/user.service";
import { authenticate } from "@/src/services/auth.service";
import { useAuth } from "@/src/store/useAuth";

const formSchema = z
  .object({
    name: z.string().min(1),
    ea_id: z.string().min(1),
    platform: z.string().min(1),
    username: z.string().min(1, "Campo obrigatório"),
    password: z.string().min(6, "Campo obrigatório"),
    confirm_password: z.string().min(6, "Campo obrigatório"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"],
  });

type FormData = z.infer<typeof formSchema>;

export default function InvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasRun = useRef(false);

  const [canRegister, setCanRegister] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const { login } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ea_id: "",
      username: "",
      password: "",
      confirm_password: "",
      platform: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmiting(true);

    try {
      await registerUser(data);
      const authData = await authenticate(data.username, data.password);
      login(authData.user, authData.token);

      alertToast.success(`Bem vindo, ${authData.user.name}!`, {
        onAutoClose: () => {
          router.push("/");
        },
      });
    } catch (error: any) {
      const message = error?.response?.data?.error ?? "Erro inesperado";

      alertToast.error(message);
    } finally {
      setSubmiting(false);
    }
  };

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    const fetchInvite = async () => {
      try {
        const response = await validateInvite(token);
        setCanRegister(response.can_register);

        form.setValue("name", response.user.name);
        form.setValue("ea_id", response.user.ea_id);
        form.setValue("platform", response.user.platform);
      } catch (error: any) {
        const message = error?.response?.data?.error ?? "Erro inesperado";

        alertToast.error(message, {
          onAutoClose() {
            router.push("/");
          },
        });
      }
    };

    fetchInvite();
  }, [token, router]);

  return (
    <div className="h-screen w-full flex items-center justify-center mx-auto px-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
            <Target className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-6xl font-bold tracking-tight">
            <span className="text-primary">FIGHT 4 FREEDOM</span>
          </span>
        </div>

        {!canRegister && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <p className="text-center text-lg">Validando convite</p>
            <Loader2 className="w-10 h-10 animate-spin mx-auto" />
          </div>
        )}

        {canRegister && (
          <Card className="w-full max-w-md">
            <CardHeader>
              Preencha seus dados para completar seu cadastro
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  id="user-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input disabled {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ea_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>EA ID</FormLabel>
                          <FormControl>
                            <Input disabled {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plataforma</FormLabel>
                        <FormControl>
                          <Input disabled {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nome de usuário{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome de usuário"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Senha <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Mínimo de 6 caracteres"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confirmar senha{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button form="user-form" type="submit" disabled={submiting}>
                {submiting ? (
                  <>
                    <span>Cadastrando</span>{" "}
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  "Cadastrar"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
