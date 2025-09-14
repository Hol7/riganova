import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { authService } from '@/services/authService';

interface User {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
  adresse?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (telephone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (telephone: string, password: string) => {
    try {
      const response = await authService.login(telephone, password);
      const { access_token, user } = response;
      
      // Store token securely
      await SecureStore.setItemAsync('auth_token', access_token);
      
      set({
        user,
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      // Remove token from secure storage
      await SecureStore.deleteItemAsync('auth_token');
    } catch (error) {
      console.log('Error removing token:', error);
    }
    
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  setToken: (token: string | null) => {
    set({ token, isAuthenticated: !!token });
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      
      // Get token from secure storage
      const token = await SecureStore.getItemAsync('auth_token');
      
      if (!token) {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      // Verify token and get user info
      const user = await authService.getCurrentUser(token);
      
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.log('Auth check failed:', error);
      // Clear invalid token
      await SecureStore.deleteItemAsync('auth_token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));