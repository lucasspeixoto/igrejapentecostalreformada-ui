'use client';

/* eslint-disable no-console */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import firebaseMessages from '@fire/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonLock } from 'react-icons/bs';
import { FaChalkboardUser } from 'react-icons/fa6';
import { MdLockOutline, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'react-toastify';

import apiAxios from '@/lib/axios/api-instance';
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
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

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

  const getSignupUserFormDataHandler = async (data: CreateUserFormData) => {
    const { name, username, email, password } = data;

    const response = await apiAxios.get<any>(`/api/v1/user`);

    console.log(response);
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

      {/* ---------------------------- Nome usuário ---------------------------- */}
      <div className="mb-3">
        <label
          htmlFor="username"
          className="mb-1 block font-medium text-black dark:text-white">
          Nome usuário
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Digite seu nome de usuário"
            {...register('username')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />

          <span className="absolute right-4 top-2.5">
            <FaChalkboardUser size={22} opacity=".5" />
          </span>

          <>
            {errors.username && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.username.message}
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
    </form>
  );
};

export default SignUpForm;
