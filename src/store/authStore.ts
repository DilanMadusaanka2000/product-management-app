import { create } from 'zustand';
import { authApi } from '@/lib/api';
import { authHelpers } from '@/lib/auth';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  initAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initAuth: () => {
    const user = authHelpers.getUser();
    const isAuthenticated = authHelpers.isAuthenticated();
    set({ user, isAuthenticated });
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authApi.login(credentials);
      authHelpers.setToken(token);
      authHelpers.setUser(user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Login failed.', isLoading: false });
      throw err;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authApi.register(credentials);
      authHelpers.setToken(token);
      authHelpers.setUser(user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Registration failed.', isLoading: false });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
