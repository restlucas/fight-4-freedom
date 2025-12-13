import { api } from "../lib/api";

export const authenticate = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });

  return response.data;
};
