'use client';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

import firebase_app from '../firebase/config';

const auth = getAuth(firebase_app);

type AuthContextType = {
  user: unknown;
  isLoadingAuthProcess: boolean;
  updateLoadingAuthProcess: (isLoading: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<unknown>(null);

  const [isLoadingAuthProcess, setIsLoadingAuthProcess] = useState(false);

  const updateLoadingAuthProcess = (isLoading: boolean) => {
    setIsLoadingAuthProcess(isLoading);
  };

  useEffect(() => {
    const authStateUnsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
        setUser(_user);

        // eslint-disable-next-line no-console
        console.log(_user.uid);
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
