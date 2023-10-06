'use client';

/* eslint-disable no-console */
import { useEffect } from 'react';

import { useAuthContext } from '@/providers/AuthContextProvider';

import SignIn from './login/page';

export default function Home() {
  const { user } = useAuthContext() as any;

  useEffect(() => {
    console.log(user?.uid);
  }, [user]);

  return (
    <>
      <SignIn />
    </>
  );
}
