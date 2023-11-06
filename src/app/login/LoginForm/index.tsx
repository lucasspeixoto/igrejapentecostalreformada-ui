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

import { GoogleLogo, SpinnerLogo } from '@/components/common/Icons';
import { useAuthContext } from '@/providers/AuthContextProvider';
import type { LoginUserFormData } from '@/schemas/authentication/signin-schema';
import { loginUserFormSchema } from '@/schemas/authentication/signin-schema';
import type { UserAuth } from '@/types/user-auth';

const LoginForm = () => {
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
    const { result, error } = await signInWithGoogle();

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      const userAuthCollection: UserAuth = {
        name: result?.user.displayName!,
        photoUrl: result?.user.photoURL!,
        email: result?.user.email!,
        userId: result?.user.uid!,
      };

      await addDocumentData('users', result?.user.uid!, {
        auth: userAuthCollection,
      });

      authContext.updateLoadingAuthProcess(false);

      router.push('/membros/profile');
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

      router.push('/membros/profile');
    }
  };

  const getLoginUserFormDataHandler = async (data: LoginUserFormData) => {
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
            className="mb-1 block font-medium text-black dark:text-white">
            E-mail
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute bottom-2.5 right-4">
            <MdOutlineMarkEmailUnread size={22} opacity=".5" />
          </span>
        </div>

        <>
          {errors.email && (
            <span className="text-sm text-meta-1 dark:text-meta-7">
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
            className="mb-1 block font-medium text-black dark:text-white">
            Senha
          </label>
          <input
            type="password"
            {...register('password')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute bottom-2.5 right-4">
            <BsPersonLock size={22} opacity=".5" />
          </span>
        </div>

        <>
          {errors.password && (
            <span className="text-sm text-meta-1 dark:text-meta-7">
              {errors.password.message}
            </span>
          )}
        </>
      </div>

      {/* Botões de ações */}
      <div className="mb-4 mt-5">
        <button
          disabled={authContext.isLoadingAuthProcess}
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {authContext.isLoadingAuthProcess && <SpinnerLogo size={22} />}
          Entrar
        </button>
      </div>

      <button
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
