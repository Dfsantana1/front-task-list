import create from 'zustand';
import { AuthState } from '../interfaces/AuthState';


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
