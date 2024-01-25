'use client';

import signInUserHandler from '@fire/auth/signin';
import firebaseMessages from '@fire/messages';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

import { useAuthContext } from '@/providers/AuthContextProvider';
import type { LoginUserFormData } from '@/schemas/authentication/signin-schema';

import LoginForm from './LoginForm';

const LoginWrapper: React.FC = () => {
  const router = useRouter();

  const authContext = useAuthContext()!;

  const singInWithUsernameOrEmailAndPasswordHandler = async (
    data: LoginUserFormData
  ) => {
    authContext.updateLoadingAuthProcess(true);

    const { usernameOrEmail, password } = data;

    const { error } = await signInUserHandler(usernameOrEmail, password);

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      authContext.updateLoadingAuthProcess(false);

      router.push('/membros/perfil');
    }
  };

  return (
    <LoginForm
      singInWithUsernameOrEmailAndPasswordHandler={
        singInWithUsernameOrEmailAndPasswordHandler
      }
    />
  );
};

export default LoginWrapper;
