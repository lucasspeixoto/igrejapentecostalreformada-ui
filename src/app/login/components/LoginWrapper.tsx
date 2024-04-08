'use client';

import signInUserHandler from '@fire/auth/signin';
import signInWithGoogle from '@fire/auth/signin-with-google';
import addDocumentData from '@fire/firestore/addData';
import firebaseMessages from '@fire/messages';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';
import type { Auth } from '@/types/auth';
import type { Process } from '@/types/process';

import type { LoginUserFormData } from '../schemas/signin-schema';
import LoginForm from './LoginForm';

const LoginWrapper: React.FC = () => {
  const router = useRouter();

  const authContext = useFirebaseAuthContext()!;

  const singInWithGoogleHandler = async (): Promise<void> => {
    const { result, error, isTheUserNew } = await signInWithGoogle();

    let userAuthCollection: Auth;

    let processCollection: Process;

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      if (isTheUserNew) {
        userAuthCollection = {
          isAdmin: false,
          role: 'Irmão(ã)',
          name: result?.user.displayName!,
          photoUrl: result?.user.photoURL!,
          email: result?.user.email!,
          userId: result?.user.uid!,
        };

        processCollection = {
          isRegistered: false,
        };

        await addDocumentData('users', result?.user.uid!, {
          auth: userAuthCollection,
        });

        await addDocumentData('users', result?.user.uid!, {
          process: processCollection,
        });

        toast.success('Bem vindo a IPR!');

        router.push('/plataforma-ipr/cadastro/pessoal');
      } else {
        router.push('/plataforma-ipr/perfil');
      }

      authContext.updateLoadingAuthProcess(false);
    }
  };

  const singInWithEmailAndPasswordHandler = async (data: LoginUserFormData) => {
    authContext.updateLoadingAuthProcess(true);

    const { email, password } = data;

    const { error } = await signInUserHandler(email, password);

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      authContext.updateLoadingAuthProcess(false);

      router.push('/plataforma-ipr/perfil');
    }
  };

  return (
    <LoginForm
      singInWithGoogleHandler={singInWithGoogleHandler}
      singInWithEmailAndPasswordHandler={singInWithEmailAndPasswordHandler}
    />
  );
};

export default LoginWrapper;
