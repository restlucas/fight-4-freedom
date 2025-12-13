"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Trash2 } from "lucide-react";

export type FilterConfig<T> = {
  key: keyof T;
  label: string;
  type: "text" | "select";
  options?: { label: string; value: string }[];
};

interface DataFiltersProps<T extends Record<string, any>> {
  filters: T;
  onChange: (filters: T) => void;
  config: FilterConfig<T>[];
}

export function DataFilters<T extends Record<string, any>>({
  filters,
  onChange,
  config,
}: DataFiltersProps<T>) {
  const hasActiveFilters = config.some((filter) => {
    const value = filters[filter.key];

    if (filter.type === "text") {
      return typeof value === "string" && value.trim() !== "";
    }

    if (filter.type === "select") {
      return value !== undefined && value !== "all";
    }

    return false;
  });

  return (
    <div className="flex flex-wrap gap-3">
      {config.map((filter) => {
        const value = filters[filter.key] ?? "";

        if (filter.type === "text") {
          return (
            <Input
              key={String(filter.key)}
              placeholder={filter.label}
              value={value}
              onChange={(e) =>
                onChange({
                  ...filters,
                  [filter.key]: e.target.value || undefined,
                })
              }
              className="max-w-xs"
            />
          );
        }

        if (filter.type === "select") {
          return (
            <Select
              key={String(filter.key)}
              value={value}
              onValueChange={(val) =>
                onChange({ ...filters, [filter.key]: val || undefined })
              }
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {filter.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }

        return null;
      })}

      {hasActiveFilters && (
        <Button variant="outline" size="icon" onClick={() => onChange({} as T)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
