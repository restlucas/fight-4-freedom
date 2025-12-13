"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/src/store/useAuth";
import { authenticate } from "../services/auth.service";
import { alertToast } from "../lib/alert-toast";

interface LoginDialogProps {
  children: React.ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await authenticate(username, password);

      if (data.ok) {
        login(data.user, data.token);

        alertToast.success(`Bem vindo, ${data.user.name}!`, {
          onAutoClose: () => {
            setOpen(false);
          },
        });
      }
    } catch (error) {
      alertToast.error("Credenciais inválidas");
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="max-lg:px-4">{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle />
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5 text-primary" />
            Login do Clã
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 my-6">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input
              id="username"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full gap-2">
              <LogIn className="h-4 w-4" />
              <span className="font-bold text-lg">Entrar</span>
            </Button>
            <p className="text-sm text-center">
              Caso tenha esquecido sua senha, contate o administrador.
            </p>
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
