'use client';

/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import firebaseMessages from '@fire/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'react-toastify';

import { SpinnerLogo } from '@/components/common/Icons';
import recoveryPasswordHandler from '@/lib/firebase/auth/recovery-password';
import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';

import type { RecoveryPasswordFormData } from '../../schemas/recovery-password-schema';
import { recoveryPasswordFormSchema } from '../../schemas/recovery-password-schema';

const RecoveryPasswordForm = () => {
  const authContext = useFirebaseAuthContext()!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryPasswordFormData>({
    resolver: zodResolver(recoveryPasswordFormSchema),
  });

  const recoveryUserPasswordHandler = async (email: string): Promise<void> => {
    const { error } = await recoveryPasswordHandler(email);

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      authContext.updateLoadingAuthProcess(false);

      toast.success(`Link de recuperação enviado para ${email}`);
    }
  };

  const getRecoveryPasswordFormDataHandler = async (
    data: RecoveryPasswordFormData
  ) => {
    authContext.updateLoadingAuthProcess(true);

    const { email } = data;

    recoveryUserPasswordHandler(email);
  };

  return (
    <form onSubmit={handleSubmit(getRecoveryPasswordFormDataHandler)}>
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

      {/* Botões de ações */}
      <div className="mb-4 mt-5">
        <button
          disabled={authContext.isLoadingAuthProcess}
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {authContext.isLoadingAuthProcess && <SpinnerLogo size={22} />}
          Enviar
        </button>
      </div>
    </form>
  );
};

export default RecoveryPasswordForm;
