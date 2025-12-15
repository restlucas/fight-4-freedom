import { FilterConfig } from "../app/(f4f)/dashboard/components/data-filters";
import { Platform, Rank, Rarity, Role, Status } from "../lib/enums";

type UserFilters = {
  username?: string;
  platform?: Platform | "all";
  status?: Status | "all";
  rank?: Rank | "all";
  role?: Role | "all";
};

type MedalFilters = {
  name?: string;
  rarity?: Rarity | "all";
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
  {
    key: "role",
    label: "Tipo",
    type: "select",
    options: [
      { label: "Administrador", value: "ADMIN" },
      { label: "Usuário", value: "USER" },
    ],
  },
];

export const medalFiltersConfig: FilterConfig<MedalFilters>[] = [
  {
    key: "name",
    label: "Buscar por nome",
    type: "text",
  },
  {
    key: "rarity",
    label: "Raridade",
    type: "select",
    options: [
      { label: "Comum", value: "COMMON" },
      { label: "Raro", value: "RARE" },
      { label: "Épico", value: "EPIC" },
      { label: "Lendário", value: "LEGENDARY" },
      { label: "Único", value: "UNIQUE" },
    ],
  },
];
