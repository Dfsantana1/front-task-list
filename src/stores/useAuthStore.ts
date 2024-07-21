import create from 'zustand';
import { AuthState } from '../interfaces/AuthState';
import { User } from '../interfaces/User'; // Asegúrate de tener una interfaz User

export const useAuthStore = create<AuthState>((set) => {
  // Cargar el usuario desde localStorage, si existe
  const storedUser = localStorage.getItem('user');
  const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    setUser: (user) => {
      set({ user });
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    logout: () => {
      set({ user: null });
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Opcional: eliminar el token también
    },
  };
});
