'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { parameters } from '@/app/membros/cadastro/constants/form-parameters';
import { SelectChevroletLogo, SpinnerLogo } from '@/components/common/Icons';
import addData from '@/lib/firebase/firestore/addData';
import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';

import { useSupplementaryContext } from '../../providers/SupplementaryContextProvider';
import type { CreateSupplementaryFamilyFormData } from '../../schemas/family-schema';
import { createSupplementaryFamilyFormSchema } from '../../schemas/family-schema';

const FamilyForm = () => {
  const firebaseAuthContext = useFirebaseAuthContext()!;

  const supplementaryContext = useSupplementaryContext()!;

  const { maritalStatusOptions } = parameters;

  const [isLoading, setIsLoading] = React.useState(false);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateSupplementaryFamilyFormData>({
    resolver: zodResolver(createSupplementaryFamilyFormSchema),
  });

  React.useEffect(() => {
    if (supplementaryContext.supplementaryData) {
      const { supplementaryData } = supplementaryContext;
      reset(supplementaryData);
    }
  }, [supplementaryContext.supplementaryData, isDataUpdated]);

  const getSupplementaryUserContactDataHandler = async (
    data: CreateSupplementaryFamilyFormData
  ) => {
    setIsLoading(true);

    const supplementaryData = data;

    const { error } = await addData('users', firebaseAuthContext.user?.uid!, {
      supplementary: supplementaryData,
    });

    if (error) {
      toast.error(
        'Error ao salvar dados de família. Tente novamente mais tarde ou contate admin.'
      );
    } else {
      supplementaryContext.updateIsDataUpdatedInfo();

      setIsDataUpdated(true);

      toast.success('Dados de família atualizados!');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(getSupplementaryUserContactDataHandler)}>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Estado Civil <span className="text-meta-1">*</span>
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              {...register('maritalStatus')}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option value="">Estado civil</option>
              {React.Children.toArray(
                maritalStatusOptions.map(status => (
                  <option value={status}>{status}</option>
                ))
              )}
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <SelectChevroletLogo size={24} />
            </span>
          </div>
          <>
            {errors.maritalStatus && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.maritalStatus.message}
              </span>
            )}
          </>
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Nome do Conjuge
          </label>
          <input
            type="text"
            placeholder="Digite o nome do Conjuge"
            {...register('spouseName')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.spouseName && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.spouseName.message}
              </span>
            )}
          </>
        </div>
      </div>

      <div className="mb-4.5">
        <label className="mb-3 block text-black dark:text-white">
          Data de casamento
        </label>
        <div className="relative">
          <input
            type="date"
            {...register('weddingDate')}
            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-4.5">
        <label className="mb-3 block text-black dark:text-white">
          Nome do pai
        </label>
        <div className="relative">
          <input
            type="text"
            {...register('fatherName')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.fatherName && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.fatherName.message}
              </span>
            )}
          </>
        </div>
      </div>

      <div className="mb-4.5">
        <label className="mb-3 block text-black dark:text-white">
          Nome da mãe
        </label>
        <div className="relative">
          <input
            type="text"
            {...register('motherName')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.motherName && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.motherName.message}
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

export default FamilyForm;
