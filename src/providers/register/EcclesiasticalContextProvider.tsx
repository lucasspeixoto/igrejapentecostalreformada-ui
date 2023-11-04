'use client';

import firebase_app from '@fire/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState } from 'react';

import { getCollection } from '@/lib/firebase/firestore/getData';
import type { Ecclesiastical } from '@/types/register/ecclesiastical';

const auth = getAuth(firebase_app);

const initialValues = {
  ecclesiasticalData: null,
  isLoadingEcclesiasticalProcess: false,
  updateLoadingEcclesiasticalProcess: () => {},
};

type EcclesiasticalContextType = {
  ecclesiasticalData: Ecclesiastical | null;
  isLoadingEcclesiasticalProcess: boolean;
  updateLoadingEcclesiasticalProcess: (isLoading: boolean) => void;
};

export const EcclesiasticalContext =
  createContext<EcclesiasticalContextType>(initialValues);

export const useEcclesiasticalContext = () => useContext(EcclesiasticalContext);

export const EcclesiasticalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [ecclesiasticalData, setEcclesiasticalData] =
    useState<Ecclesiastical | null>(null);

  const [isLoadingEcclesiasticalProcess, setIsLoadingEcclesiasticalProcess] =
    useState(false);

  const updateLoadingEcclesiasticalProcess = (isLoading: boolean) => {
    setIsLoadingEcclesiasticalProcess(isLoading);
  };

  React.useEffect(() => {
    const authStateUnsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
        const ecclesiasticalDataUserData = getCollection(
          'users',
          _user.uid,
          'ecclesiastical'
        );
        ecclesiasticalDataUserData
          .then(data => {
            setEcclesiasticalData(data?.result);
          })
          .catch(error => {
            throw new Error(error.message);
          });
      } else {
        setEcclesiasticalData(null);
      }

      updateLoadingEcclesiasticalProcess(false);
    });

    return () => authStateUnsubscribe();
  }, []);

  return (
    <EcclesiasticalContext.Provider
      value={{
        ecclesiasticalData,
        isLoadingEcclesiasticalProcess,
        updateLoadingEcclesiasticalProcess,
      }}>
      {children}
    </EcclesiasticalContext.Provider>
  );
};
