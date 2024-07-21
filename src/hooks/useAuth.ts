import { useMutation } from 'react-query';
import api from '../api/axios';

interface LoginValues {
  email: string;
  password: string;
}

// Tipo para el error de la mutación
type AxiosError = {
  message: string;
};

export const useAuth = () => {
  const loginMutation = useMutation(
    (values: LoginValues) => api.post('/login', values),
    {
      // Opcional: puedes manejar callbacks adicionales aquí si es necesario
      onError: (error) => {
        console.error('Login failed:', error);
      },
    }
  );

  const login = (values: LoginValues) => {
    loginMutation.mutate(values);
  };

  return {
    login,
    isLoading: loginMutation.isLoading,
    error: loginMutation.error ? (loginMutation.error as AxiosError).message : null,
    isSuccess: loginMutation.isSuccess,
  } as {
    login: (values: LoginValues) => void;
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
  };
};
