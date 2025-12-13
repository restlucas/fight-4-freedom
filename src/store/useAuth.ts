import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthStore {
  user: any | null;
  isAdmin: boolean;
  initialized: boolean;
  getUser: () => any | null;
  login: (user: any, token: string) => void;
  logout: () => void;
  init: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAdmin: false,
  initialized: false,

  getUser: () => {
    const user = localStorage.getItem("@f4f-client/user");
    return user ? JSON.parse(user) : null;
  },

  login: (user, token) => {
    Cookies.set("session", user, { expires: 7 });
    localStorage.setItem("@f4f-client/token", token);
    localStorage.setItem("@f4f-client/user", JSON.stringify(user));
    set({
      user: user,
      isAdmin: user.role === "ADMIN",
    });
  },

  logout: () => {
    Cookies.remove("session");
    localStorage.removeItem("@f4f-client/token");
    localStorage.removeItem("@f4f-client/user");
    set({
      user: null,
      isAdmin: false,
    });
  },

  init: async () => {
    const token = localStorage.getItem("@f4f-client/token");

    if (!token) {
      set({ initialized: true });
      return;
    }

    try {
      const res = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Token inválido");

      const userData = await res.json();

      localStorage.setItem("@f4f-client/user", JSON.stringify(userData));
      set({
        user: userData,
        isAdmin: userData.role === "ADMIN",
        initialized: true,
      });
    } catch (err) {
      console.error(err);
      localStorage.removeItem("@f4f-client/token");
      localStorage.removeItem("@f4f-client/user");
      set({ user: null, isAdmin: false, initialized: true });
    }
  },
}));
