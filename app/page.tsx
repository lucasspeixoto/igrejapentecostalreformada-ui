'use client';

/* eslint-disable no-console */
import type { Metadata } from 'next';
import { useEffect } from 'react';

import { useAuthContext } from '@/providers/AuthContextProvider';

import SignIn from './login/page';

export const metadata: Metadata = {
  title: 'Bem vindo a plataforma IPR',
  description: 'Página incial de login na plataforma IPR',
  // other metadata
};

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
