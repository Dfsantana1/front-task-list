import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

interface PrivateRouteProps {
  element: React.ReactElement;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const { user } = useAuthStore(state => ({ user: state.user }));

  return (
    <Routes>
      <Route
        path={path}
        element={user ? element : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default PrivateRoute;
