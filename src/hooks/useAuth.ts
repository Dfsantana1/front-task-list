import { useMutation } from 'react-query';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

type AxiosError = {
  message: string;
};

export const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation(
    (values: LoginValues) => api.post('/users/login', values),
    {
      onSuccess: (data) => {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.data.token);
        navigate('/dashboard'); 
      },
      onError: (error) => {
        console.error('Login failed:', error);
      },
    }
  );

  const registerMutation = useMutation(
    (values: RegisterValues) => api.post('/users/register', values),
    {
      onSuccess: (data) => {
        console.log('Registration successful:', data);
        localStorage.setItem('token', data.data.token);
        navigate('/dashboard'); 
      },
      onError: (error) => {
        console.error('Registration failed:', error);
      },
    }
  );

  const login = (values: LoginValues) => {
    loginMutation.mutate(values);
  };

  const register = (values: RegisterValues) => {
    registerMutation.mutate(values);
  };

  return {
    login,
    register,
    isLoading: loginMutation.isLoading || registerMutation.isLoading,
    error: loginMutation.error ? (loginMutation.error as AxiosError).message : registerMutation.error ? (registerMutation.error as AxiosError).message : null,
    isSuccess: loginMutation.isSuccess || registerMutation.isSuccess,
  } as {
    login: (values: LoginValues) => void;
    register: (values: RegisterValues) => void;
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
  };
};
