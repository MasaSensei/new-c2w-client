import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token: string | null;
  user: any;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
