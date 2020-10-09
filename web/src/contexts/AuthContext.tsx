import type { ReactNode } from 'react';
import React, { createContext, useEffect, useState } from 'react';
import SplashScreen from 'src/components/SplashScreen';
import firebase, { auth } from 'src/firebase';
import { User } from '../types/user';

interface AuthProviderProps {
  children: ReactNode;
}

const createUserWithEmailAndPassword = async (email: string, password: string): Promise<any> => (
  auth.createUserWithEmailAndPassword(email, password)
);

const signInWithEmailAndPassword = (email: string, password: string): Promise<any> => (
  auth.signInWithEmailAndPassword(email, password)
);

const signInWithGoogle = (): Promise<any> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

const logout = (): Promise<void> => auth.signOut();

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  logout: () => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  logout: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve(),
};

export const AuthContext = createContext<AuthState>({
  ...initialState,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [isInitialized, setInitialized] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.getIdTokenResult()
        .then((result) => {
          setUser((prev) => ({
            ...prev,
            isAdmin: Boolean(result.claims.isAdmin),
          }));
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      if (user) {
        setUser({
          id: userData.uid,
          avatar: userData.photoURL,
          email: userData.email,
          name: userData.displayName || userData.email,
          isAdmin: false,
        });

        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        setUser(null);
      }
      setInitialized(true);
    });
  }, [user]);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        isAuthenticated,

        // added for convenience
        logout,
        signInWithEmailAndPassword,
        signInWithGoogle,
        createUserWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
