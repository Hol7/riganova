import { loginUser } from "@/services/authService";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

type Role = "client" | "livreur" | "manager" | "admin";

interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  role: Role | null;
  me: any | null;
  login: (telephone: string, mot_de_passe: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<State>((set) => ({
  isLoading: false,
  isAuthenticated: false,
  token: null,
  role: null,
  me: null,

  login: async (telephone, mot_de_passe) => {
    const { access_token, user } = await loginUser(telephone, mot_de_passe);
    await SecureStore.setItemAsync("access_token", access_token);
    set({ token: access_token, me: user, role: user.role, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("access_token");
    set({ isAuthenticated: false, token: null, role: null, me: null });
  },
}));
