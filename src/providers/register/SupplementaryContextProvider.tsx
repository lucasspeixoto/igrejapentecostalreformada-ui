'use client';

import firebase_app from '@fire/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState } from 'react';

import { getCollection } from '@/lib/firebase/firestore/getData';
import type { Supplementary } from '@/types/register/supplementary';

const auth = getAuth(firebase_app);

const initialValues = {
  supplementaryData: null,
  isLoadingSupplementaryProcess: false,
  updateLoadingSupplementaryProcess: () => {},
};

type SupplementaryContextType = {
  supplementaryData: Supplementary | null;
  isLoadingSupplementaryProcess: boolean;
  updateLoadingSupplementaryProcess: (isLoading: boolean) => void;
};

export const SupplementaryContext =
  createContext<SupplementaryContextType>(initialValues);

export const useSupplementaryContext = () => useContext(SupplementaryContext);

export const SupplementaryContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [supplementaryData, setSupplementaryData] =
    useState<Supplementary | null>(null);

  const [isLoadingSupplementaryProcess, setIsLoadingSupplementaryProcess] =
    useState(false);

  const updateLoadingSupplementaryProcess = (isLoading: boolean) => {
    setIsLoadingSupplementaryProcess(isLoading);
  };

  React.useEffect(() => {
    const authStateUnsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
        const supplementaryUserData = getCollection(
          'users',
          _user.uid,
          'supplementary'
        );
        supplementaryUserData
          .then(data => {
            setSupplementaryData(data?.result);
          })
          .catch(error => {
            throw new Error(error.message);
          });
      } else {
        setSupplementaryData(null);
      }

      updateLoadingSupplementaryProcess(false);
    });

    return () => authStateUnsubscribe();
  }, []);

  return (
    <SupplementaryContext.Provider
      value={{
        supplementaryData,
        isLoadingSupplementaryProcess,
        updateLoadingSupplementaryProcess,
      }}>
      {children}
    </SupplementaryContext.Provider>
  );
};
