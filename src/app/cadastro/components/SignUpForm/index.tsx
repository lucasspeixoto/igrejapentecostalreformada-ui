'use client';

/* eslint-disable no-console */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import addData from '@fire/firestore/addData';
import firebaseMessages from '@fire/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import signInUserHandler from '@signin/lib/firebase/signin';
import signInWithGoogle from '@signin/lib/firebase/signin-with-google';
import signUp from '@signup/lib/firebase/signup';
import type { CreateUserFormData } from '@signup/schemas/signup-schema';
import { createUserFormSchema } from '@signup/schemas/signup-schema';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonLock } from 'react-icons/bs';
import { MdLockOutline, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'react-toastify';

import { GoogleLogo } from '@/components/common/Icons';
import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const authContext = useFirebaseAuthContext()!;

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

      router.push('/plataforma-ipr/cadastro/pessoal');
    }
  };

  const loginUserHandler = async (email: string, password: string): Promise<void> => {
    const { error } = await signInUserHandler(email, password);

    if (error) {
      toast.error(firebaseMessages[error.code]);
    } else {
      router.push('/plataforma-ipr/cadastro/pessoal');

      authContext.updateLoadingAuthProcess(false);
    }
  };

  const signupUserHandler = async (name: string, email: string, password: string): Promise<void> => {
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
        <label htmlFor="name" className="mb-1 block font-medium text-black dark:text-white">
          Nome
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Digite seu nome"
            {...register('name')}
            className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
          />

          <span className="absolute bottom-3.5 right-4">
            <BsPersonLock size={22} opacity=".5" />
          </span>
        </div>
        <>
          {errors.name && <span className="text-xs text-meta-1 dark:text-meta-7">{errors.name.message}</span>}
        </>
      </div>

      {/* ---------------------------- E-mail ---------------------------- */}
      <div className="mb-3">
        <label className="mb-1 block font-medium text-black dark:text-white">Email</label>
        <div className="relative">
          <input
            type="email"
            placeholder="Digite seu email"
            {...register('email')}
            className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
          />

          <span className="absolute bottom-3.5 right-4">
            <MdOutlineMarkEmailUnread size={22} opacity=".5" />
          </span>
        </div>
        <>
          {errors.email && (
            <span className="text-xs text-meta-1 dark:text-meta-7">{errors.email.message}</span>
          )}
        </>
      </div>

      {/* ---------------------------- Senha ---------------------------- */}
      <div className="mb-3">
        <label htmlFor="password" className="mb-1 block font-medium text-black dark:text-white">
          Senha
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
            className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
          />
          <span className="absolute bottom-3.5 right-4">
            <MdLockOutline size={22} opacity=".5" />
          </span>
        </div>
        <>
          {errors.password && (
            <span className="text-xs text-meta-1 dark:text-meta-7">{errors.password.message}</span>
          )}
        </>
      </div>

      {/* ---------------------------- Confirmação Senha ---------------------------- */}
      <div className="mb-3">
        <label className="mb-1 block font-medium text-black dark:text-white">Confirmar a Senha</label>
        <div className="relative">
          <input
            type="password"
            placeholder="Confirmar a Senha"
            {...register('confirmedPassword')}
            className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
          />
          <span className="absolute bottom-3.5 right-4">
            <MdLockOutline size={22} opacity=".5" />
          </span>
        </div>
        <>
          {errors.confirmedPassword && (
            <span className="text-xs text-meta-1 dark:text-meta-7">{errors.confirmedPassword.message}</span>
          )}
        </>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        {/* <div className=""> */}
        <button
          disabled={authContext.isLoadingAuthProcess}
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-[220px]">
          Cadastrar
        </button>
        {/* </div> */}

        <button
          disabled={authContext.isLoadingAuthProcess}
          onClick={singUpWithGoogleHandler}
          type="button"
          className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50 md:w-[220px]">
          <GoogleLogo size={22} />
          Cadastrar com Google
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
