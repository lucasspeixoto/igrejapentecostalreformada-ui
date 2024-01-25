'use client';

/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonLock } from 'react-icons/bs';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';

import RedirectLink from '@/app/components/RedirectLink';
import { SpinnerLogo } from '@/components/common/Icons';
import { useAuthContext } from '@/providers/AuthContextProvider';
import type { LoginUserFormData } from '@/schemas/authentication/signin-schema';
import { loginUserFormSchema } from '@/schemas/authentication/signin-schema';

type LoginFormProps = {
  singInWithUsernameOrEmailAndPasswordHandler: (
    data: LoginUserFormData
  ) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  singInWithUsernameOrEmailAndPasswordHandler,
}) => {
  const authContext = useAuthContext()!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(singInWithUsernameOrEmailAndPasswordHandler)}>
      {/* ---------------------------- E-mail ---------------------------- */}
      <div className="mb-3 gap-2">
        <div className="relative">
          <label
            htmlFor="usernameOrEmail"
            data-testid="usernameOrEmail"
            className="mb-1 block font-medium text-black dark:text-white">
            E-mail ou usuário
          </label>
          <input
            id="usernameOrEmail"
            type="text"
            aria-label="usernameOrEmail"
            {...register('usernameOrEmail')}
            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute bottom-2.5 right-4">
            <MdOutlineMarkEmailUnread size={22} opacity=".5" />
          </span>
        </div>

        <>
          {errors.usernameOrEmail && (
            <span
              role="alert"
              data-testid="usernameOrEmail-error"
              className="text-sm text-meta-1 dark:text-meta-7">
              {errors.usernameOrEmail.message}
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
    </form>
  );
};

export default LoginForm;
