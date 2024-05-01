'use client';

import { registerParameters } from '@cadastro/constants/form-parameters';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { SelectChevroletLogo, SpinnerLogo } from '@/components/common/Icons';
import addData from '@/lib/firebase/firestore/addData';
import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';

import { useSupplementaryContext } from '../../providers/SupplementaryContextProvider';
import type { CreateSupplementaryEducationFormData } from '../../schemas/education-schema';
import { createSupplementaryEducationFormSchema } from '../../schemas/education-schema';

const EducationForm = () => {
  const firebaseAuthContext = useFirebaseAuthContext()!;

  const supplementaryContext = useSupplementaryContext()!;

  const [isLoading, setIsLoading] = React.useState(false);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const { schoolingOptions } = registerParameters;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateSupplementaryEducationFormData>({
    resolver: zodResolver(createSupplementaryEducationFormSchema),
  });

  React.useEffect(() => {
    if (supplementaryContext.supplementaryData) {
      const { schooling, profession } = supplementaryContext.supplementaryData;
      reset({
        schooling,
        profession,
      });
    }
  }, [supplementaryContext.supplementaryData, isDataUpdated]);

  const getSupplementaryEducationDataHandler = async (data: CreateSupplementaryEducationFormData) => {
    setIsLoading(true);

    const supplementaryData = data;

    const { error } = await addData('users', firebaseAuthContext.user?.uid!, {
      supplementary: supplementaryData,
    });

    if (error) {
      toast.error('Error ao salvar dados de educação. Tente novamente mais tarde ou contate admin.');
    } else {
      supplementaryContext.updateIsDataUpdatedInfo();

      setIsDataUpdated(true);

      toast.success('Dados de educação atualizados!');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(getSupplementaryEducationDataHandler)}>
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Escolaridade <span className="text-meta-1">*</span>
        </label>
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            {...register('schooling')}
            className="strokedark relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary">
            <option value="">Selecione a escolaridade</option>
            {React.Children.toArray(
              schoolingOptions.map(schooling => <option value={schooling}>{schooling}</option>)
            )}
          </select>
          <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
            <SelectChevroletLogo size={24} />
          </span>
        </div>
        <>
          {errors.schooling && (
            <span className="text-xs text-meta-1 dark:text-meta-7">{errors.schooling.message}</span>
          )}
        </>
      </div>

      <div className="mb-4.5">
        <label className="mb-3 block text-black dark:text-white">Profissão</label>
        <div className="relative">
          <input
            type="text"
            {...register('profession')}
            className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
          />
          <>
            {errors.profession && (
              <span className="text-xs text-meta-1 dark:text-meta-7">{errors.profession.message}</span>
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

export default EducationForm;
