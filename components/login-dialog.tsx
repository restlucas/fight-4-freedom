"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/store/useAuth";

interface LoginDialogProps {
  children: React.ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    try {
      const data = await res.json();

      if (data.ok) {
        login(data.user);

        toast.success("Login realizado com sucesso", {
          style: {
            backgroundColor: "oklch(0.16 0.015 240)",
            border: "1px solid var(--color-emerald-500) ",
            color: "var(--color-emerald-500) ",
          },
          duration: 3000,
          onAutoClose: () => {
            setOpen(false);
          },
        });
      }
    } catch (error) {
      toast.error("Credenciais inválidas", {
        style: {
          backgroundColor: "oklch(0.16 0.015 240)",
          color: "var(--destructive)",
          border: "1px solid var(--destructive)",
        },
        duration: 3000,
      });
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
