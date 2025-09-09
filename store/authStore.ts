import { loginUser } from "@/services/authService";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

type Role = "client" | "livreur" | "manager" | "admin";

interface AuthState {
  token: string | null;
  user: any | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface State extends AuthState {
  login: (telephone: string, mot_de_passe: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuthState: (state: Partial<AuthState>) => void;
  me: any | null; // Keep for backward compatibility
}

export const useAuthStore = create<State>((set, get) => ({
  isLoading: true,
  isAuthenticated: false,
  token: null,
  role: null,
  me: null,
  user: null,

  setAuthState: (newState) => {
    set((state) => ({
      ...state,
      ...newState,
      me: newState.user || state.me, // Keep me in sync with user
    }));
  },

  login: async (telephone, mot_de_passe) => {
    try {
      set({ isLoading: true });
      const { access_token, user } = await loginUser(telephone, mot_de_passe);
      
      console.log("Login successful, setting auth state:", { access_token, user });
      
      // Store in secure storage
      await SecureStore.setItemAsync("access_token", access_token);
      await SecureStore.setItemAsync("user_data", JSON.stringify(user));
      
      const newState = { 
        token: access_token, 
        me: user, 
        user: user,
        role: user.role, 
        isAuthenticated: true,
        isLoading: false
      };
      
      console.log("Setting auth state to:", newState);
      set(newState);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("user_data");
    set({ 
      isAuthenticated: false, 
      token: null, 
      role: null, 
      me: null, 
      user: null,
      isLoading: false
    });
  },
}));
