'use client';

import addData from '@fire/firestore/addData';
import firebaseMessages from '@fire/messages';
import signInUserHandler from '@signin/lib/firebase/signin';
import signInWithGoogle from '@signin/lib/firebase/signin-with-google';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';

import type { LoginUserFormData } from '../schemas/signin-schema';
import LoginForm from './LoginForm';

const LoginWrapper: React.FC = () => {
  const router = useRouter();

  const authContext = useFirebaseAuthContext()!;

  const singInWithGoogleHandler = async (): Promise<void> => {
    const { result, error, isTheUserNew } = await signInWithGoogle();

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      if (isTheUserNew) {
        const userAuthCollection = {
          isAdmin: false,
          role: 'Irmão(ã)',
          name: result?.user.displayName!,
          photoUrl: result?.user.photoURL!,
          email: result?.user.email!,
          userId: result?.user.uid!,
        };

        const processCollection = {
          isRegistered: false,
        };

        await addData('users', result?.user.uid!, {
          auth: userAuthCollection,
        });

        await addData('users', result?.user.uid!, {
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
