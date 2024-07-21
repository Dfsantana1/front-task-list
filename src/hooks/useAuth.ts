import { useMutation } from 'react-query';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useStore';

interface LoginValues {
  email: string;
  password: string;
}

type AxiosError = {
  message: string;
};

export const useAuth = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser); // Obtén la función setUser del store

  const loginMutation = useMutation(
    (values: LoginValues) => api.post('/users/login', values),
    {
      onSuccess: (data) => {
        console.log('Login successful:', data);

        localStorage.setItem('token', data.data.token);

        // Actualizar el estado global del usuario
        setUser(data.data.user);

        // Redirigir al usuario
        navigate('/dashboard');
      },
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
