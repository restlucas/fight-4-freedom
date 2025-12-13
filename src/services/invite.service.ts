import { api } from "../lib/api";

export async function validateInvite(token: string) {
  const response = await api.get(`/users/invite/${token}`);
  return response.data;
}
