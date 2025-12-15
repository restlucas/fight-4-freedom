import { api } from "@/src/lib/api";

export type InviteUserPayload = {
  username: string;
  name: string;
  platform: string;
  ea_id: string;
  role: string;
};

export type PreRegisterUserPayload = {
  username: string;
  name: string;
  platform: string;
  ea_id: string;
  role: string;
};

export type RegisterUserPayload = {
  name: string;
  password: string;
  confirm_password: string;
};

export type UpdateUserPayload = {
  id?: string;
  ea_id: string;
  bio?: string;
  platform?: string;
  role?: string;
  name?: string;
  username?: string;
  password?: string;
  confirm_password?: string;
};

export const usersService = {
  fetchByUsername: async (username: string) => {
    const { data } = await api.get(`/users/${username}`);
    return data;
  },

  preRegister: async (payload: PreRegisterUserPayload) => {
    const { data } = await api.post("/users/register", payload);
    return data;
  },

  register: async (payload: RegisterUserPayload) => {
    const { data } = await api.put("/users/register", payload);
    return data;
  },

  update: async (payload: UpdateUserPayload) => {
    const { data } = await api.put("/users", payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  },
};
