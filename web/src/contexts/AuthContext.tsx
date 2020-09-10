import type { ReactNode } from 'react';
import React, { createContext, useEffect, useState, } from 'react';
import SplashScreen from 'src/components/SplashScreen';
import firebase, { auth } from 'src/firebase';
import { User } from "../types/user";

interface AuthProviderProps {
  children: ReactNode;
}

const createUserWithEmailAndPassword = async (email: string, password: string): Promise<any> => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const signInWithEmailAndPassword = (email: string, password: string): Promise<any> => {
  return auth.signInWithEmailAndPassword(email, password);
};

const signInWithGoogle = (): Promise<any> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

const logout = (): Promise<void> => {
  return auth.signOut();
};

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
  const [isInitialized, setInitialized] = useState(false)
  const [isAuthenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          id: user.uid,
          avatar: user.photoURL,
          email: user.email,
          name: user.displayName || user.email,
        });
        setAuthenticated(true)

      } else {
        setAuthenticated(false)
        setUser(null)
      }
      setInitialized(true)
    });
  }, []);

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

