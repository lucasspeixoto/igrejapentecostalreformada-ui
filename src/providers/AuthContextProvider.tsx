'use client';

import firebase_app from '@fire/config';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';

const auth = getAuth(firebase_app);

const initialValues = {
  user: null,
  isLoadingAuthProcess: false,
  isAuthenticated: false,
  updateLoadingAuthProcess: () => {},
};

type AuthContextType = {
  user: User | null;
  isLoadingAuthProcess: boolean;
  isAuthenticated: boolean;
  updateLoadingAuthProcess: (isLoading: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>(initialValues);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const [isLoadingAuthProcess, setIsLoadingAuthProcess] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateLoadingAuthProcess = (isLoading: boolean) => {
    setIsLoadingAuthProcess(isLoading);
  };

  React.useEffect(() => {
    updateLoadingAuthProcess(true);

    const authStateUnsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
        setUser(_user);
        setIsAuthenticated(true);
      } else {
        router.push('/login');
        setUser(null);
        setIsAuthenticated(false);
      }
      updateLoadingAuthProcess(false);
    });

    return () => authStateUnsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuthProcess,
        isAuthenticated,
        updateLoadingAuthProcess,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
