import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }
  if (isAuthenticated===false) {
    return <Navigate to="/login" />;
  }

  return  <Outlet context={{ user }} /> 
};

export default ProtectedRoute;
