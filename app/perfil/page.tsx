"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Check, X, Edit2 } from "lucide-react";
import { useAuth } from "@/store/useAuth";
import { notFound } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Platform } from "@/lib/types";

type EditableFieldProps<T> = {
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  type?: "input" | "textarea" | "select";
  options?: T[];
};

function useEditableField<T>(initialValue: T) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(initialValue);

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setTempValue(initialValue);
    setIsEditing(false);
  };
  const saveEditing = () => {
    setIsEditing(false);
    return tempValue;
  };

  return {
    isEditing,
    tempValue,
    setTempValue,
    startEditing,
    cancelEditing,
    saveEditing,
  };
}

function EditableInput({
  value,
  onChange,
  placeholder,
  type = "input",
  size = "default",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "input" | "textarea" | "select";
  size?: "default" | "lg";
}) {
  const {
    isEditing,
    tempValue,
    setTempValue,
    startEditing,
    cancelEditing,
    saveEditing,
  } = useEditableField(value);

  return isEditing ? (
    <div className="flex flex-col items-end gap-2">
      {type === "input" && (
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder={placeholder}
          autoFocus
          onBlur={cancelEditing} // <-- aqui apenas cancela sem salvar
          onKeyDown={(e) => {
            if (e.key === "Enter") onChange(saveEditing());
            if (e.key === "Escape") cancelEditing();
          }}
        />
      )}

      {type === "select" && (
        <Select
          value={tempValue}
          onValueChange={(value) => setTempValue(value as Platform)}
          onOpenChange={(open) => {
            if (!open) cancelEditing();
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PC">PC</SelectItem>
            <SelectItem value="PlayStation">PlayStation</SelectItem>
            <SelectItem value="Xbox">Xbox</SelectItem>
          </SelectContent>
        </Select>
      )}

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={cancelEditing}>
          <X className="h-3 w-3 mr-1" />
          Cancelar
        </Button>
        <Button size="sm" onClick={() => onChange(saveEditing())}>
          <Check className="h-3 w-3 mr-1" />
          Salvar
        </Button>
      </div>
    </div>
  ) : (
    <button
      onClick={startEditing}
      className="group flex items-center gap-3 w-full text-left hover:bg-primary p-3 rounded-lg transition-colors"
    >
      <span className={`font-bold ${size === "lg" ? "text-2xl" : "text-base"}`}>
        {value}
      </span>
      <Edit2 className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

function EditableTextarea({
  value,
  onChange,
  placeholder,
  maxLength = 200,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  const {
    isEditing,
    tempValue,
    setTempValue,
    startEditing,
    cancelEditing,
    saveEditing,
  } = useEditableField(value);

  return isEditing ? (
    <div className="space-y-2">
      <Textarea
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="resize-none"
        autoFocus
        maxLength={maxLength}
        onBlur={() => onChange(saveEditing())}
      />
      <div className="flex items-center justify-between">
        <span>
          {tempValue.length}/{maxLength} caracteres
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={cancelEditing}>
            <X className="h-3 w-3 mr-1" /> Cancelar
          </Button>
          <Button size="sm" onClick={() => onChange(saveEditing())}>
            <Check className="h-3 w-3 mr-1" /> Salvar
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <button
      onClick={startEditing}
      className="group w-full text-left hover:bg-primary p-3 rounded-lg transition-colors"
    >
      <div className="flex items-start gap-3">
        <p className="flex-1">{value}</p>
        <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
      </div>
    </button>
  );
}

export default function PerfilPage() {
  const { user } = useAuth();

  if (!user) return notFound();

  const { name, bio, avatar, platform, ea_id, createdAt } = user;

  const [avatarPreview, setAvatarPreview] = useState(avatar);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Meu Perfil</h1>
          <p className="mt-1">Clique nos campos para editar suas informações</p>
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
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary transition-all group-hover:border-primary">
                <Image
                  src={avatarPreview}
                  alt={name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <label
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
              </label>
            </div>
            <p>Clique no ícone para alterar sua foto</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-muted-foreground uppercase tracking-wider font-semibold">
                Nome de Exibição
              </label>
              <EditableInput
                value={name}
                size="lg"
                onChange={(val) => console.log("Salvar nome:", val)}
                placeholder="Digite seu nome"
              />
            </div>

            <div className="space-y-2">
              <label className="text-muted-foreground uppercase tracking-wider font-semibold">
                Biografia
              </label>
              <EditableTextarea
                value={bio}
                onChange={(val) => console.log("Salvar bio:", val)}
                placeholder="Conte um pouco sobre você e seu estilo de jogo"
              />
            </div>

            <div className="pt-6 border-t border-border/40 space-y-4">
              <h3 className="font-semibold text-muted-foreground uppercase tracking-wider">
                Informações do Jogo
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1">EA ID</p>
                  <EditableInput
                    value={ea_id}
                    onChange={(val) => console.log("Salvar EA ID:", val)}
                    placeholder="Digite seu EA ID"
                  />
                </div>

                <div>
                  <p className="mb-1">Plataforma</p>
                  <EditableInput
                    value={platform}
                    type="select"
                    onChange={(val) => console.log("Salvar Plataforma:", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
