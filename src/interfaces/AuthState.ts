import { User } from "./User";

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export type AxiosError = {
  message: string;
};

export interface AuthResponse {
  token: string;
  user: User;
}
