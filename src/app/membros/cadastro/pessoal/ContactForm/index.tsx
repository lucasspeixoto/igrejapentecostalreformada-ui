'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { SpinnerLogo } from '@/components/common/Icons';
import addData from '@/lib/firebase/firestore/addData';
import { useAuthContext } from '@/providers/AuthContextProvider';
import {
  type CreatePersonalContactFormData,
  createPersonalContactFormSchema,
} from '@/schemas/register/personal-schema';

const ContactForm = () => {
  const authContext = useAuthContext()!;

  const [isLoading, setIsLoading] = React.useState(false);

  /* The code is using the `useForm` hook from the `react-hook-form` library to
  handle form validation and submission. */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePersonalContactFormData>({
    resolver: zodResolver(createPersonalContactFormSchema),
  });

  /**
   * The function `getPersonalUserContactDataHandler` takes in personal contact
   * data, combines it into a user contact collection object, adds it to a user's
   * data in a Firestore database, and handles loading state.
   * @param {CreatePersonalContactFormData} data - The `data` parameter is of type
   * `CreatePersonalContactFormData`. It is an object that contains the personal
   * contact data of a user. The properties of this object include:
   */
  const getPersonalUserContactDataHandler = async (
    data: CreatePersonalContactFormData
  ) => {
    setIsLoading(true);

    const { name, lastName, sex, cellphone, telephone, birthday } = data;

    const userPersonalContactCollection = {
      name: `${name} ${lastName}`,
      sex,
      cellphone,
      telephone,
      birth_date: birthday,
    };

    await addData('users', authContext.user?.uid!, {
      personal: userPersonalContactCollection,
    });

    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {/* Formulário */}
      <form onSubmit={handleSubmit(getPersonalUserContactDataHandler)}>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
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

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Sobrenome <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Digite seu sobrenome"
              {...register('lastName')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <>
              {errors.lastName && (
                <span className="text-xs text-meta-1 dark:text-meta-7">
                  {errors.lastName.message}
                </span>
              )}
            </>
          </div>
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
              Telefone <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Digite seu telefone"
              {...register('telephone')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-3 block text-black dark:text-white">
            Data de nascimento
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
    </React.Fragment>
  );
};

export default ContactForm;
