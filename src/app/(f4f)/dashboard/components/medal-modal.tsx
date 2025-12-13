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

interface MedalModalProps {
  medal: Medal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function MedalModal({
  medal,
  open,
  onOpenChange,
  onClose,
}: MedalModalProps) {
  const [formData, setFormData] = useState<Partial<Medal>>({
    name: "",
    description: "",
    criteria: "",
    icon: "",
    rarity: "comum",
  });

  useEffect(() => {
    if (medal) {
      setFormData(medal);
    } else {
      setFormData({
        name: "",
        description: "",
        criteria: "",
        icon: "",
        rarity: "comum",
      });
    }
  }, [medal, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle />
        <DialogHeader>
          <DialogTitle>Criar Nova Medalha</DialogTitle>
          <DialogDescription>
            Defina o ícone, nome e descrição da medalha personalizada
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="icon">Ícone (Emoji)</Label>
            <Input
              id="icon"
              placeholder="🏆"
              maxLength={2}
              className="text-2xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medal-name">Nome da Medalha</Label>
            <Input
              id="medal-name"
              placeholder="Ex: Sniper Elite"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rarity">Raridade</Label>
            <Select
              value={formData.rarity}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  rarity: value as "lendario" | "epico" | "raro" | "comum",
                })
              }
            >
              <SelectTrigger id="rarity">
                <SelectValue placeholder="Selecione a raridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lendário">Lendário</SelectItem>
                <SelectItem value="épico">Épico</SelectItem>
                <SelectItem value="raro">Raro</SelectItem>
                <SelectItem value="comum">Comum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o que esta medalha representa..."
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="criteria">Critério para Obtenção</Label>
            <Textarea
              id="criteria"
              placeholder="Ex: Conseguir 20 kills sem morrer em uma partida"
              rows={2}
              value={formData.criteria}
              onChange={(e) =>
                setFormData({ ...formData, criteria: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onClose}>Criar Medalha</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
