'use client';

/* eslint-disable no-console */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* import signIn from '@fire/auth/signin'; */

import signInUserHandler from '@fire/auth/signin';
import signInWithGoogle from '@fire/auth/signin-with-google';
import addDocumentData from '@fire/firestore/addData';
import firebaseMessages from '@fire/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonLock } from 'react-icons/bs';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'react-toastify';

import RedirectLink from '@/app/components/RedirectLink';
import { GoogleLogo, SpinnerLogo } from '@/components/common/Icons';
import { useAuthContext } from '@/providers/AuthContextProvider';
import type { LoginUserFormData } from '@/schemas/authentication/signin-schema';
import { loginUserFormSchema } from '@/schemas/authentication/signin-schema';
import type { Process } from '@/types/process';
import type { UserAuth } from '@/types/user-auth';

const LoginForm: React.FC = () => {
  const router = useRouter();

  const authContext = useAuthContext()!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const singInWithGoogleHandler = async (): Promise<void> => {
    const { result, error, isTheUserNew } = await signInWithGoogle();

    let userAuthCollection: UserAuth;

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

        router.push('/membros/cadastro/pessoal');
      } else {
        router.push('/membros/perfil');
      }

      authContext.updateLoadingAuthProcess(false);
    }
  };

  const loginUserHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    const { error } = await signInUserHandler(email, password);

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      authContext.updateLoadingAuthProcess(false);

      router.push('/membros/perfil');
    }
  };

  const getLoginUserFormDataHandler = (data: LoginUserFormData) => {
    authContext.updateLoadingAuthProcess(true);

    const { email, password } = data;

    loginUserHandler(email, password);
  };

  return (
    <form onSubmit={handleSubmit(getLoginUserFormDataHandler)}>
      {/* ---------------------------- E-mail ---------------------------- */}
      <div className="mb-3 gap-2">
        <div className="relative">
          <label
            htmlFor="email"
            data-testid="email"
            className="mb-1 block font-medium text-black dark:text-white">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            aria-label="email"
            {...register('email')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute bottom-2.5 right-4">
            <MdOutlineMarkEmailUnread size={22} opacity=".5" />
          </span>
        </div>

        <>
          {errors.email && (
            <span
              role="alert"
              data-testid="email-error"
              className="text-sm text-meta-1 dark:text-meta-7">
              {errors.email.message}
            </span>
          )}
        </>
      </div>

      {/* ---------------------------- Senha ---------------------------- */}
      <div className="mb-3 gap-2">
        <div className="relative">
          <label
            htmlFor="password"
            data-testid="password"
            className="mb-1 block font-medium text-black dark:text-white">
            Senha
          </label>
          <input
            id="password"
            type="password"
            aria-label="password"
            {...register('password')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute bottom-2.5 right-4">
            <BsPersonLock size={22} opacity=".5" />
          </span>
        </div>

        <>
          {errors.password && (
            <span
              role="alert"
              data-testid="password-error"
              className="text-sm text-meta-1 dark:text-meta-7">
              {errors.password.message}
            </span>
          )}
        </>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="text-center">
          <RedirectLink
            text="Não possui conta ?"
            textLink="Cadastrar"
            route="/cadastro"
          />
        </div>

        <div className=" text-center">
          <RedirectLink
            text=""
            textLink="Esqueceu a senha ?"
            route="/recuperar-senha"
          />
        </div>
      </div>

      {/* Botões de ações */}
      <div className="mb-4 mt-5">
        <button
          data-testid="login-button"
          disabled={authContext.isLoadingAuthProcess}
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {authContext.isLoadingAuthProcess && <SpinnerLogo size={22} />}
          Entrar
        </button>
      </div>

      <button
        data-testid="login-with-google-button"
        disabled={authContext.isLoadingAuthProcess}
        onClick={singInWithGoogleHandler}
        type="button"
        className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
        <GoogleLogo size={22} />
        Entrar com o Google
      </button>
    </form>
  );
};

export default LoginForm;
