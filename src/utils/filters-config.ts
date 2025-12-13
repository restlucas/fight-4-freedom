import { FilterConfig } from "../app/(f4f)/dashboard/components/data-filters";
import { Platform, Rank, Status } from "../lib/enums";

type UserFilters = {
  username?: string;
  platform?: Platform | "all";
  status?: Status | "all";
  rank?: Rank | "all";
};

export const userFiltersConfig: FilterConfig<UserFilters>[] = [
  {
    key: "username",
    label: "Buscar por nome",
    type: "text",
  },
  {
    key: "platform",
    label: "Plataforma",
    type: "select",
    options: [
      { label: "PC", value: "PC" },
      { label: "PlayStation", value: "PLAYSTATION" },
      { label: "Xbox", value: "XBOX" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Ativo", value: "ACTIVE" },
      { label: "Pendente", value: "PENDING" },
      { label: "Inativo", value: "INACTIVE" },
      { label: "Banido", value: "BANNED" },
    ],
  },
];
