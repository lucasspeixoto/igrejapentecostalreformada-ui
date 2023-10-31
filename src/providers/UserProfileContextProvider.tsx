'use client';

import firebase_app from '@fire/config';
import { getCollection } from '@fire/firestore/getData';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';

import type { UserAuth } from '@/types/user-auth';

const auth = getAuth(firebase_app);

const initialState = {
  authData: null,
  isLoadingData: false,
  updateIsLoadingData: () => {},
};

type UserProfileContextType = {
  authData: UserAuth | null;
  isLoadingData: boolean;
  updateIsLoadingData: (isLoading: boolean) => void;
};

export const UserProfileContext =
  React.createContext<UserProfileContextType>(initialState);

export const useUserProfileContext = () => React.useContext(UserProfileContext);

export const UserProfileContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [authData, setAuthData] = React.useState<UserAuth | null>(null);

  const [isLoadingData, setIsLoadingData] = React.useState(false);

  const updateIsLoadingData = (isLoading: boolean) => {
    setIsLoadingData(isLoading);
  };

  React.useEffect(() => {
    const authStateUnsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
        const authUserData = getCollection('users', _user.uid, 'auth');
        authUserData
          .then(data => {
            setAuthData(data?.result);
          })
          .catch(error => {
            throw new Error(error.message);
          });
      } else {
        setAuthData(null);
      }

      updateIsLoadingData(false);
    });

    return () => authStateUnsubscribe();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        authData,
        isLoadingData,
        updateIsLoadingData,
      }}>
      {children}
    </UserProfileContext.Provider>
  );
};
