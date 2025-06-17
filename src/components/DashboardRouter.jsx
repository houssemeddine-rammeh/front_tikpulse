import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import ManagerDashboardPage from '../pages/ManagerDashboardPage';
import CreatorDashboardPage from '../pages/CreatorDashboardPage';
import LoadingScreen from '../components/LoadingScreen';

const DashboardRouter = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      {user.role === 'admin' && (
        <Route path="/" element={<AdminDashboardPage />} />
      )}
      {user.role === 'manager' && (
        <Route path="/" element={<ManagerDashboardPage />} />
      )}
      {user.role === 'creator' && (
        <Route path="/" element={<CreatorDashboardPage />} />
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default DashboardRouter; 

