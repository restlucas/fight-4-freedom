import { api } from "../lib/api";

export async function validateInvite(token: string) {
  const response = await api.get(`/users/invite/${token}`);
  return response.data;
}

export async function resendInvite(playerId: string) {
  const response = await api.post(`/users/invite/resend`, { playerId });
  return response.data;
}
