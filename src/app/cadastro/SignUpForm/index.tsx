/* eslint-disable no-console */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

'use client';

import signInWithGoogle from '@fire/auth/signin-with-google';
import signUp from '@fire/auth/signup';
import addData from '@fire/firestore/addData';
import firebaseMessages from '@fire/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonLock } from 'react-icons/bs';
import { MdLockOutline, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'react-toastify';

import { GoogleLogo } from '@/components/common/Icons';
import signInUserHandler from '@/lib/firebase/auth/signin';
import { useAuthContext } from '@/providers/AuthContextProvider';
import type { CreateUserFormData } from '@/schemas/authentication/signup-schema';
import { createUserFormSchema } from '@/schemas/authentication/signup-schema';

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const authContext = useAuthContext()!;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const singUpWithGoogleHandler = async (): Promise<void> => {
    const { name } = getValues();
    const { result, error } = await signInWithGoogle();

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      const userAuthCollection = {
        isAdmin: false,
        role: 'Irmão(ã)',
        name,
        photoUrl: result?.user.photoURL,
        email: result?.user.email,
        userId: result?.user.uid,
      };

      const processCollection = {
        isRegistered: false,
      };

      await addData('users', result?.user.uid!, { auth: userAuthCollection });

      await addData('users', result?.user.uid!, { process: processCollection });

      authContext.updateLoadingAuthProcess(false);

      router.push('/membros/cadastro/pessoal');
    }
  };

  const loginUserHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    const { error } = await signInUserHandler(email, password);

    if (error) {
      toast.error(firebaseMessages[error.code]);
    } else {
      router.push('/membros/cadastro/pessoal');

      authContext.updateLoadingAuthProcess(false);
    }
  };

  const signupUserHandler = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const { result, error } = await signUp(name, email, password);

    const userId = result?.user.uid!;

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      const userAuthCollection = {
        name,
        isAdmin: false,
        role: 'Irmão(ã)',
        photoUrl: '',
        email: result?.user.email,
        userId,
      };

      const processCollection = {
        isRegistered: false,
      };

      await addData('users', userId, { auth: userAuthCollection });

      await addData('users', userId, { process: processCollection });

      loginUserHandler(email, password);
    }
  };

  const getSignupUserFormDataHandler = async (data: CreateUserFormData) => {
    authContext.updateLoadingAuthProcess(true);

    const { name, email, password } = data;

    signupUserHandler(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit(getSignupUserFormDataHandler)}>
      {/* ---------------------------- Nome ---------------------------- */}
      <div className="mb-3">
        <label
          htmlFor="name"
          className="mb-1 block font-medium text-black dark:text-white">
          Nome
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Digite seu nome"
            {...register('name')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />

          <span className="absolute right-4 top-2.5">
            <BsPersonLock size={22} opacity=".5" />
          </span>

          <>
            {errors.name && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.name.message}
              </span>
            )}
          </>
        </div>
      </div>

      {/* ---------------------------- E-mail ---------------------------- */}
      <div className="mb-3">
        <label className="mb-1 block font-medium text-black dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Digite seu email"
            {...register('email')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />

          <span className="absolute right-4 top-2.5">
            <MdOutlineMarkEmailUnread size={22} opacity=".5" />
          </span>

          <>
            {errors.email && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.email.message}
              </span>
            )}
          </>
        </div>
      </div>

      {/* ---------------------------- Senha ---------------------------- */}
      <div className="mb-3">
        <label
          htmlFor="password"
          className="mb-1 block font-medium text-black dark:text-white">
          Senha
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />

          <span className="absolute right-4 top-2.5">
            <MdLockOutline size={22} opacity=".5" />
          </span>

          <>
            {errors.password && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.password.message}
              </span>
            )}
          </>
        </div>
      </div>

      {/* ---------------------------- Confirmação Senha ---------------------------- */}
      <div className="mb-3">
        <label className="mb-1 block font-medium text-black dark:text-white">
          Confirmar a Senha
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="Confirmar a Senha"
            {...register('confirmedPassword')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />

          <span className="absolute right-4 top-2.5">
            <MdLockOutline size={22} opacity=".5" />
          </span>

          <>
            {errors.confirmedPassword && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.confirmedPassword.message}
              </span>
            )}
          </>
        </div>
      </div>

      <div className="mb-4 mt-5">
        <button
          disabled={authContext.isLoadingAuthProcess}
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          Cadastrar
        </button>
      </div>

      <button
        disabled={authContext.isLoadingAuthProcess}
        onClick={singUpWithGoogleHandler}
        type="button"
        className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
        <GoogleLogo size={22} />
        Cadastrar com Google
      </button>
    </form>
  );
};

export default SignUpForm;
