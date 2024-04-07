'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { SpinnerLogo } from '@/components/common/Icons';
import addData from '@/lib/firebase/firestore/addData';
import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';

import { usePersonalContext } from '../../providers/PersonalContextProvider';
import type { CreatePersonalDocsFormData } from '../../schemas/docs-schema';
import { createPersonalDocsFormSchema } from '../../schemas/docs-schema';

const DocsForm = () => {
  const firebaseAuthContext = useFirebaseAuthContext()!;

  const personalContext = usePersonalContext()!;

  const [isLoading, setIsLoading] = React.useState(false);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePersonalDocsFormData>({
    resolver: zodResolver(createPersonalDocsFormSchema),
  });

  React.useEffect(() => {
    if (personalContext.personalData) {
      const { rg, cpf } = personalContext.personalData;

      reset({ rg, cpf });
    }
  }, [personalContext.personalData, isDataUpdated]);

  const getPersonalUserDocsDataHandler = async (
    data: CreatePersonalDocsFormData
  ) => {
    setIsLoading(true);

    const { rg, cpf } = data;

    const userPersonalDocsCollection = {
      rg,
      cpf,
    };

    const { error } = await addData('users', firebaseAuthContext.user?.uid!, {
      personal: userPersonalDocsCollection,
    });

    if (error) {
      toast.error(
        'Error ao salvar documentos. Tente novamente mais tarde ou contate admin.'
      );
    } else {
      personalContext.updateIsDataUpdatedInfo();

      setIsDataUpdated(true);

      toast.success('Documentos atualizados!');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(getPersonalUserDocsDataHandler)}>
      <div className="mb-4.5">
        <label className="mb-3 block text-black dark:text-white">
          RG <span className="text-meta-1">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            {...register('rg')}
            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.rg && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.rg.message}
              </span>
            )}
          </>
        </div>
      </div>

      <div className="mb-4.5">
        <label className="mb-3 block text-black dark:text-white">
          CPF <span className="text-meta-1">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            {...register('cpf')}
            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.cpf && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.cpf.message}
              </span>
            )}
          </>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-primary bg-primary p-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        {isLoading && <SpinnerLogo size={22} />}
        Salvar
      </button>
    </form>
  );
};

export default DocsForm;
