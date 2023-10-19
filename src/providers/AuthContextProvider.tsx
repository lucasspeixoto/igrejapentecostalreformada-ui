'use client';

import firebase_app from '@fire/config';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

const auth = getAuth(firebase_app);

const initialValues = {
  user: null,
  isLoadingAuthProcess: false,
  updateLoadingAuthProcess: () => {},
};

type AuthContextType = {
  user: User | null;
  isLoadingAuthProcess: boolean;
  updateLoadingAuthProcess: (isLoading: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>(initialValues);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoadingAuthProcess, setIsLoadingAuthProcess] = useState(false);

  const updateLoadingAuthProcess = (isLoading: boolean) => {
    setIsLoadingAuthProcess(isLoading);
  };

  useEffect(() => {
    const authStateUnsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
        setUser(_user);
      } else {
        setUser(null);
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
        updateLoadingAuthProcess,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
