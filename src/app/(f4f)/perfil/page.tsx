"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Camera, Check, X, Edit2 } from "lucide-react";
import { useAuth } from "@/src/store/useAuth";
import { notFound } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { User } from "@/src/lib/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { ProtectedRoute } from "@/src/components/protected-route";
import { Platform } from "@/src/lib/enums";

type EditableFieldProps<T> = {
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  type?: "input" | "textarea" | "select";
  options?: T[];
};

function useEditableField<T>(initialValue: T) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(
    (initialValue as unknown as string) ?? ""
  );

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setTempValue((initialValue as unknown as string) ?? "");
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
            <SelectItem value="PLAYSTATION">PlayStation</SelectItem>
            <SelectItem value="XBOX">Xbox</SelectItem>
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
          {(tempValue ?? "").length}/{maxLength} caracteres
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
        <p className="flex-1 text-lg">{value ?? placeholder}</p>
        <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
      </div>
    </button>
  );
}

function PerfilContent({ user }: { user: User }) {
  const { name, bio, avatar, platform, ea_id, createdAt } = user;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {};
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
              <Avatar className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary transition-all group-hover:border-primary">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-4xl font-bold">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
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
      </div>
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
