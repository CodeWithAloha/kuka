import type { ReactNode } from 'react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface AuthGuardProps {
  children?: ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {children}
    </>
  );
}

export default AuthGuard;
