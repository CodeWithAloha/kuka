import type { ReactNode } from 'react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface AdminGuardProps {
  children?: ReactNode;
}

function AdminGuard({ children }: AdminGuardProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user.isAdmin) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {children}
    </>
  );
}

export default AdminGuard;
