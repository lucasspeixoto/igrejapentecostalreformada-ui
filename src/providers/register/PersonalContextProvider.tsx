'use client';

import firebase_app from '@fire/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState } from 'react';

import { getCollection } from '@/lib/firebase/firestore/getData';
import type { Personal } from '@/types/register/personal';

const auth = getAuth(firebase_app);

const initialValues = {
  personalData: null,
  isLoadingPersonalProcess: false,
  updateLoadingPersonalProcess: () => {},
};

type PersonalContextType = {
  personalData: Personal | null;
  isLoadingPersonalProcess: boolean;
  updateLoadingPersonalProcess: (isLoading: boolean) => void;
};

export const PersonalContext =
  createContext<PersonalContextType>(initialValues);

export const usePersonalContext = () => useContext(PersonalContext);

export const PersonalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [personalData, setPersonalData] = useState<Personal | null>(null);

  const [isLoadingPersonalProcess, setIsLoadingPersonalProcess] =
    useState(false);

  const updateLoadingPersonalProcess = (isLoading: boolean) => {
    setIsLoadingPersonalProcess(isLoading);
  };

  React.useEffect(() => {
    const authStateUnsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
        const personalUserData = getCollection('users', _user.uid, 'personal');
        personalUserData
          .then(data => {
            setPersonalData(data?.result);
          })
          .catch(error => {
            throw new Error(error.message);
          });
      } else {
        setPersonalData(null);
      }

      updateLoadingPersonalProcess(false);
    });

    return () => authStateUnsubscribe();
  }, []);

  return (
    <PersonalContext.Provider
      value={{
        personalData,
        isLoadingPersonalProcess,
        updateLoadingPersonalProcess,
      }}>
      {children}
    </PersonalContext.Provider>
  );
};
