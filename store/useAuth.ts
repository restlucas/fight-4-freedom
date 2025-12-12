import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthStore {
  user: any | null;
  isAdmin: boolean;
  login: (user: any) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAdmin: false,

  login: (user) => {
    Cookies.set("session", user, { expires: 7 });
    set({
      user: user,
      isAdmin: user.role === "admin",
    });
  },

  logout: () => {
    Cookies.remove("session");
    set({
      user: null,
      isAdmin: false,
    });
  },
}));
