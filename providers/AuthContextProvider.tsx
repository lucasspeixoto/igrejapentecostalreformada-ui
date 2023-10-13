'use client';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

import firebase_app from '../firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<unknown>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user: unknown) => {
      if (_user) {
        setUser(_user);
        console.log(_user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
