import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the AuthContext

const PrivateRoute = ({ path, element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
