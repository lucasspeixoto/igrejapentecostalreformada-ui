/* eslint-disable tailwindcss/migration-from-tailwind-2 */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonLock } from 'react-icons/bs';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { z } from 'zod';

import { GoogleLogo } from '@/components/common/Icons';

const loginUserFormSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório!')
    .email('E-mail em formato inválido!')
    .toLowerCase()
    .refine(email => {
      return email.endsWith('.com');
    }, 'Domínio de email incorreto'),
  password: z.string().min(6, 'A senha precisa conter no mínimo 6 caracteres!'),
});

type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const loginUserHandler = (data: LoginUserFormData) => {
    // eslint-disable-next-line no-console
    console.log(data);

    router.push('/membros');
  };
  return (
    <React.Fragment>
      {/* Formulário */}
      <form onSubmit={handleSubmit(loginUserHandler)}>
        {/* ---------------------------- E-mail ---------------------------- */}
        <div className="mb-3 gap-2">
          <div className="relative">
            <label htmlFor="email" className="font-bold text-white">
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
              <span className="text-sm text-meta-1">
                {errors.email.message}
              </span>
            )}
          </>
        </div>

        {/* ---------------------------- Senha ---------------------------- */}
        <div className="mb-3 gap-2">
          <div className="relative">
            <label htmlFor="password" className="font-bold text-white">
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
              <span className="text-sm text-meta-1">
                {errors.password.message}
              </span>
            )}
          </>
        </div>

        {/* Botões de ações */}
        <div className="mb-4 mt-10">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
            Entrar
          </button>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
          <GoogleLogo size={22} />
          Entrar com o Google
        </button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
