'use client';

import firebase_app from '@fire/config';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

const auth = getAuth(firebase_app);

const initialValues = {
  user: null,
  isLoadingAuthProcess: false,
  isAuthenticated: false,
  updateLoadingAuthProcess: () => {},
};

type FirebaseAuthContextType = {
  user: User | null;
  isLoadingAuthProcess: boolean;
  isAuthenticated: boolean;
  updateLoadingAuthProcess: (isLoading: boolean) => void;
};

export const FirebaseAuthContext = React.createContext<FirebaseAuthContextType>(initialValues);

export const useFirebaseAuthContext = () => React.useContext(FirebaseAuthContext);

export const FirebaseAuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const router = useRouter();

  const [isLoadingAuthProcess, setIsLoadingAuthProcess] = React.useState(false);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const updateLoadingAuthProcess = React.useCallback((isLoading: boolean) => {
    setIsLoadingAuthProcess(isLoading);
  }, []);

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
    <FirebaseAuthContext.Provider
      value={{
        user,
        isLoadingAuthProcess,
        isAuthenticated,
        updateLoadingAuthProcess,
      }}>
      <>{children}</>
    </FirebaseAuthContext.Provider>
  );
};
