'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { SpinnerLogo } from '@/components/common/Icons';
import { parameters } from '@/constants/form-parameters';
import addData from '@/lib/firebase/firestore/addData';
import { useAuthContext } from '@/providers/AuthContextProvider';
import { useSupplementaryContext } from '@/providers/register/SupplementaryContextProvider';
import type { CreateSupplementaryFamilyFormData } from '@/schemas/register/supplementary/family-schema';
import { createSupplementaryFamilyFormSchema } from '@/schemas/register/supplementary/family-schema';

const FamilyForm = () => {
  const authContext = useAuthContext()!;

  const supplementaryContext = useSupplementaryContext()!;

  const { maritalStatusOptions } = parameters;

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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { supplementaryData } = supplementaryContext;
      reset(supplementaryData);
    }
  }, [supplementaryContext]);

  const getSupplementaryUserContactDataHandler = async (
    data: CreateSupplementaryFamilyFormData
  ) => {
    supplementaryContext.updateLoadingSupplementaryProcess(true);

    const supplementaryData = data;

    const { error } = await addData('users', authContext.user?.uid!, {
      supplementary: supplementaryData,
    });

    if (error) {
      toast.error(
        'Error ao salvar dados de família. Tente novamente mais tarde ou contate admim.'
      );
    } else {
      toast.success('Dados de família atualizados!');
    }

    supplementaryContext.updateLoadingSupplementaryProcess(false);
  };

  return (
    <React.Fragment>
      {/* Formulário */}
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
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""></path>
                  </g>
                </svg>
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
              Nome do Conjuge <span className="text-meta-1">*</span>
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
          </div>
        </div>

        <button
          type="submit"
          disabled={supplementaryContext.isLoadingSupplementaryProcess}
          className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-primary bg-primary p-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {supplementaryContext.isLoadingSupplementaryProcess && (
            <SpinnerLogo size={22} />
          )}
          Salvar
        </button>
      </form>
    </React.Fragment>
  );
};

export default FamilyForm;
