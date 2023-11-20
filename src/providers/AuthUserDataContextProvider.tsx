'use client';

import firebase_app from '@fire/config';
import { getCollection } from '@fire/firestore/getData';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

import type { UserAuth } from '@/types/user-auth';

const auth = getAuth(firebase_app);

const initialState = {
  authData: null,
  isLoadingData: false,
  isAuthenticated: false,
  updateIsLoadingData: () => {},
  setUpdatedAuthData: () => {},
};

type AuthUserDataContextType = {
  authData: UserAuth | null;
  isLoadingData: boolean;
  isAuthenticated: boolean;
  updateIsLoadingData: (isLoading: boolean) => void;
  setUpdatedAuthData: (authData: UserAuth | null) => void;
};

export const AuthUserDataContext =
  React.createContext<AuthUserDataContextType>(initialState);

export const useAuthUserDataContext = () =>
  React.useContext(AuthUserDataContext);

export const AuthUserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [authData, setAuthData] = React.useState<UserAuth | null>(null);

  const [isLoadingData, setIsLoadingData] = React.useState(false);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const router = useRouter();

  const updateIsLoadingData = (isLoading: boolean) => {
    setIsLoadingData(isLoading);
  };

  const setUpdatedAuthData = (data: UserAuth | null) => {
    setAuthData(data);
  };

  React.useEffect(() => {
    updateIsLoadingData(true);

    const authStateUnsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
        setIsAuthenticated(true);
        const authUserData = getCollection('users', _user.uid, 'auth');
        authUserData
          .then(data => {
            setAuthData(data?.result);
          })
          .catch(error => {
            throw new Error(error.message);
          });
      } else {
        setIsAuthenticated(false);
        router.push('/login');
        setAuthData(null);
      }

      updateIsLoadingData(false);
    });

    return () => authStateUnsubscribe();
  }, []);

  return (
    <AuthUserDataContext.Provider
      value={{
        authData,
        isLoadingData,
        isAuthenticated,
        updateIsLoadingData,
        setUpdatedAuthData,
      }}>
      <>{isAuthenticated ? children : null}</>
    </AuthUserDataContext.Provider>
  );
};
