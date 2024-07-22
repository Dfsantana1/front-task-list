// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user } = useAuthStore(state => ({ user: state.user }));

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
