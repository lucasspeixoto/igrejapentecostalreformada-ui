'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { SpinnerLogo } from '@/components/common/Icons';
import { parameters } from '@/constants/form-parameters';
import addData from '@/lib/firebase/firestore/addData';
import { useAuthContext } from '@/providers/AuthContextProvider';
import { usePersonalContext } from '@/providers/register/PersonalContextProvider';
import type { CreatePersonalAddressFormData } from '@/schemas/register/address-schema';
import { createPersonalAddressFormSchema } from '@/schemas/register/address-schema';

const AddressForm = () => {
  const authContext = useAuthContext()!;

  const personalContext = usePersonalContext()!;

  const [isLoading, setIsLoading] = React.useState(false);

  const states = parameters.stateOptions;

  /* The code is using the `useForm` hook from the `react-hook-form` library to
  handle form validation and submission. */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePersonalAddressFormData>({
    resolver: zodResolver(createPersonalAddressFormSchema),
  });

  React.useEffect(() => {
    if (personalContext.personalData) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { address, cep, city, complement, district, number, state } =
        personalContext.personalData;
      reset({
        address,
        cep,
        city,
        complement,
        district,
        number,
        state,
      });
    }
  }, [personalContext]);

  const getPersonalUserAddressDataHandler = async (
    data: CreatePersonalAddressFormData
  ) => {
    setIsLoading(true);

    const { address, cep, city, complement, district, number, state } = data;

    const userPersonalAddressCollection = {
      address,
      cep,
      city,
      complement,
      district,
      number,
      state,
    };

    const { error } = await addData('users', authContext.user?.uid!, {
      personal: userPersonalAddressCollection,
    });

    if (error) {
      toast.error(
        'Error ao salvar dados de enredeço. Tente novamente mais tarde ou contate admim.'
      );
    } else {
      toast.success('Dados de endereço atualizados!');
    }

    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {/* Formulário */}
      <form onSubmit={handleSubmit(getPersonalUserAddressDataHandler)}>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              CEP <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Digite seu CEP"
              {...register('cep')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <>
              {errors.cep && (
                <span className="text-xs text-meta-1 dark:text-meta-7">
                  {errors.cep.message}
                </span>
              )}
            </>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Estado <span className="text-meta-1">*</span>
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                {...register('state')}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                <option value="">Selecione o Estado</option>
                {React.Children.toArray(
                  states.map(state => <option value={state}>{state}</option>)
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
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Cidade <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite a cidade"
            {...register('city')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.city && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.city.message}
              </span>
            )}
          </>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Rua <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite a rua"
            {...register('address')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.address && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.address.message}
              </span>
            )}
          </>
        </div>

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Bairro <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Digite o bairro"
              {...register('district')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <>
              {errors.district && (
                <span className="text-xs text-meta-1 dark:text-meta-7">
                  {errors.district.message}
                </span>
              )}
            </>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Número <span className="text-meta-1">*</span>
            </label>
            <input
              type="number"
              placeholder="Digite o número"
              {...register('number')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <>
              {errors.number && (
                <span className="text-xs text-meta-1 dark:text-meta-7">
                  {errors.number.message}
                </span>
              )}
            </>
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Complemento <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite o complemento"
            {...register('complement')}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <>
            {errors.complement && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.complement.message}
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
    </React.Fragment>
  );
};

export default AddressForm;
