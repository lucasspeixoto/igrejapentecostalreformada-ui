/* eslint-disable max-len */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { registerParameters } from '@/app/plataforma-ipr/cadastro/constants/form-parameters';
import { SelectChevroletLogo, SpinnerLogo } from '@/components/common/Icons';
import addData from '@/lib/firebase/firestore/addData';
import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';

import { useEcclesiasticalContext } from '../../providers/EcclesiasticalContextProvider';
import type { CreateEcclesiasticalBaptismFormData } from '../../schemas/baptism-schema';
import { createEcclesiasticalBaptismFormSchema } from '../../schemas/baptism-schema';

const BaptismForm = () => {
  const firebaseAuthContext = useFirebaseAuthContext()!;

  const ecclesiasticalContext = useEcclesiasticalContext()!;

  const [isLoading, setIsLoading] = React.useState(false);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const { baptismOption } = registerParameters;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEcclesiasticalBaptismFormData>({
    resolver: zodResolver(createEcclesiasticalBaptismFormSchema),
  });

  React.useEffect(() => {
    if (ecclesiasticalContext.ecclesiasticalData) {
      const { baptism, baptismDate, baptismShepherd } =
        ecclesiasticalContext.ecclesiasticalData;
      reset({
        baptism,
        baptismDate,
        baptismShepherd,
      });
    }
  }, [ecclesiasticalContext.ecclesiasticalData, isDataUpdated]);

  const getEcclesiasticalBaptismDataHandler = async (
    data: CreateEcclesiasticalBaptismFormData
  ) => {
    setIsLoading(true);

    const { error } = await addData('users', firebaseAuthContext.user?.uid!, {
      ecclesiastical: data,
    });

    if (error) {
      toast.error(
        'Error ao salvar dados eclesiásticos. Tente novamente mais tarde ou contate admin.'
      );
    } else {
      ecclesiasticalContext.updateIsDataUpdatedInfo();

      setIsDataUpdated(true);

      toast.success('Dados eclesiásticos atualizados!');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(getEcclesiasticalBaptismDataHandler)}>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Batizado <span className="text-meta-1">*</span>
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              {...register('baptism')}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option value="">Selecione se é batizado</option>
              {React.Children.toArray(
                baptismOption.map(baptism => (
                  <option value={baptism}>{baptism}</option>
                ))
              )}
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <SelectChevroletLogo size={24} />
            </span>
          </div>
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Data de Batismo
          </label>

          <div className="relative">
            <input
              type="date"
              {...register('baptismDate')}
              className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <>
              {errors.baptismDate && (
                <span className="text-xs text-meta-1 dark:text-meta-7">
                  {errors.baptismDate.message}
                </span>
              )}
            </>
          </div>
        </div>
      </div>

      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Pastor de Batismo
        </label>
        <input
          type="text"
          placeholder="Digite o pastor de batismo"
          {...register('baptismShepherd')}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
        <>
          {errors.baptismShepherd && (
            <span className="text-xs text-meta-1 dark:text-meta-7">
              {errors.baptismShepherd.message}
            </span>
          )}
        </>
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

export default BaptismForm;
