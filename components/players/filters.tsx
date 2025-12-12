"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Platform } from "@/lib/types";

type SortOption = "kd" | "kills" | "revives" | "winRate" | "hoursPlayed";

interface Props {
  searchTerm: string;
  platformFilter: Platform | "all";
  sortBy: SortOption;
  onSearch: (v: string) => void;
  onPlatformChange: (v: Platform | "all") => void;
  onSortChange: (v: SortOption) => void;
}

export function PlayerFilters({
  searchTerm,
  platformFilter,
  sortBy,
  onSearch,
  onPlatformChange,
  onSortChange,
}: Props) {
  return (
    <div className="flex items-center justify-start gap-4 flex-wrap">
      <div className="relative min-w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />

        <Input
          placeholder="Buscar por nome ou EA ID..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select
        value={platformFilter}
        onValueChange={(v) => onPlatformChange(v as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Plataforma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="PC">PC</SelectItem>
          <SelectItem value="PlayStation">PlayStation</SelectItem>
          <SelectItem value="Xbox">Xbox</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={(v) => onSortChange(v as any)}>
        <SelectTrigger>
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="kd">K/D Ratio</SelectItem>
          <SelectItem value="kills">Kills</SelectItem>
          <SelectItem value="revives">Revives</SelectItem>
          <SelectItem value="winRate">Taxa de Vitória</SelectItem>
          <SelectItem value="hoursPlayed">Horas Jogadas</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
