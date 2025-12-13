import { api } from "@/src/lib/api";

type InviteUserPayload = {
  username: string;
  name: string;
  platform: string;
  ea_id: string;
  role: string;
};

type RegisterUserPayload = {
  name: string;
  ea_id: string;
  platform: string;
  username: string;
  password: string;
  confirm_password: string;
};

type UpdateUserPayload = {
  id: string;
  ea_id: string;
  bio?: string;
};

export const inviteUser = async (payload: InviteUserPayload) => {
  const { data } = await api.post("/users/invite", payload);
  return data;
};

export const fetchUser = async (username: string) => {
  const { data } = await api.get(`/users/${username}`);
  return data;
};

export const registerUser = async (payload: RegisterUserPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const updateUser = async (payload: UpdateUserPayload) => {
  const { data } = await api.put("/users", payload);
  return data;
};
