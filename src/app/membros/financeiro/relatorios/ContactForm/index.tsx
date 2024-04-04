'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { SelectChevroletLogo, SpinnerLogo } from '@/components/common/Icons';
import addData from '@/lib/firebase/firestore/addData';
import { useAuthContext } from '@/providers/AuthContextProvider';
import { usePersonalContext } from '@/providers/register/PersonalContextProvider';
import {
  type CreatePersonalContactFormData,
  createPersonalContactFormSchema,
} from '@/schemas/register/personal/personal-schema';

const ContactForm = () => {
  const authContext = useAuthContext();

  const personalContext = usePersonalContext();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePersonalContactFormData>({
    resolver: zodResolver(createPersonalContactFormSchema),
  });

  React.useEffect(() => {
    if (personalContext.personalData) {
      const { name, sex, cellphone, telephone, birthday } =
        personalContext.personalData;
      reset({
        name,
        sex,
        cellphone,
        telephone,
        birthday,
      });
    }
  }, [personalContext, isDataUpdated]);

  const getPersonalUserContactDataHandler = async (
    data: CreatePersonalContactFormData
  ) => {
    setIsLoading(true);

    const { name, sex, cellphone, telephone, birthday } = data;

    const userPersonalContactCollection = {
      name,
      sex,
      cellphone,
      telephone,
      birthday,
    };

    const { error } = await addData('users', authContext.user?.uid!, {
      personal: userPersonalContactCollection,
    });

    if (error) {
      toast.error(
        'Error ao salvar dados de contato. Tente novamente mais tarde ou contate admim.'
      );
    } else {
      personalContext.updateIsDataUpdatedInfo();

      setIsDataUpdated(true);

      toast.success('Dados de contato atualizados!');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(getPersonalUserContactDataHandler)}>
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Nome <span className="text-meta-1">*</span>
        </label>
        <input
          type="text"
          placeholder="Digite seu nome"
          {...register('name')}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
        <>
          {errors.name && (
            <span className="text-xs text-meta-1 dark:text-meta-7">
              {errors.name.message}
            </span>
          )}
        </>
      </div>

      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Sexo <span className="text-meta-1">*</span>
        </label>
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            {...register('sex')}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="">Selecione seu sexo</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
          </select>
          <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
            <SelectChevroletLogo size={24} />
          </span>
        </div>
        <>
          {errors.sex && (
            <span className="text-xs text-meta-1 dark:text-meta-7">
              {errors.sex.message}
            </span>
          )}
        </>
      </div>

      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Celular <span className="text-meta-1">*</span>
          </label>
          <input
            type="number"
            placeholder="Digite seu celular"
            {...register('cellphone')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.cellphone && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.cellphone.message}
              </span>
            )}
          </>
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Telefone
          </label>
          <input
            type="text"
            placeholder="Digite seu telefone"
            {...register('telephone')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.telephone && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.telephone.message}
              </span>
            )}
          </>
        </div>
      </div>

      <div className="mb-4.5">
        <label className="mb-3 block text-black dark:text-white">
          Data de nascimento <span className="text-meta-1">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            {...register('birthday')}
            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
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

export default ContactForm;
