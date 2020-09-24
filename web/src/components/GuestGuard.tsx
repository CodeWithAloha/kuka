import type { ReactNode } from 'react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface GuestGuardProps {
  children?: ReactNode;
}

function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {children}
    </>
  );
}

export default GuestGuard;
