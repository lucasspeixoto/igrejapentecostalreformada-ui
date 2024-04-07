'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { parameters } from '@/app/membros/cadastro/constants/form-parameters';
import { SelectChevroletLogo, SpinnerLogo } from '@/components/common/Icons';
import api from '@/lib/axios/via-cep-instance';
import addData from '@/lib/firebase/firestore/addData';
import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';
import type { ViaCepResponse } from '@/types/via-cep-response';

import { usePersonalContext } from '../../providers/PersonalContextProvider';
import type { CreatePersonalAddressFormData } from '../../schemas/address-schema';
import { createPersonalAddressFormSchema } from '../../schemas/address-schema';

const AddressForm = () => {
  const firebaseAuthContext = useFirebaseAuthContext()!;

  const personalContext = usePersonalContext();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const states = parameters.stateOptions;

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
  }, [personalContext, isDataUpdated]);

  const getAddressByCep = async (event: React.FocusEvent<HTMLElement>) => {
    const targetEvent = event.target as EventTarget & HTMLSelectElement;

    const selectedCep = targetEvent.value;

    if (selectedCep) {
      const { data } = await api.get<ViaCepResponse>(`/${selectedCep}/json`);

      if (data) {
        reset({
          address: data.logradouro,
          city: data.localidade,
          district: data.bairro,
          state: data.uf,
        });
      }
    }
  };

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

    const { error } = await addData('users', firebaseAuthContext.user?.uid!, {
      personal: userPersonalAddressCollection,
    });

    if (error) {
      toast.error(
        'Error ao salvar dados de endereço. Tente novamente mais tarde ou contate admin.'
      );
    } else {
      personalContext.updateIsDataUpdatedInfo();

      setIsDataUpdated(true);

      toast.success('Dados de endereço atualizados!');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(getPersonalUserAddressDataHandler)}>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            CEP <span className="text-meta-1">*</span>
          </label>
          <input
            type="number"
            placeholder="Digite seu CEP"
            {...register('cep')}
            onBlur={getAddressByCep}
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
              <SelectChevroletLogo size={24} />
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
          Complemento
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
  );
};

export default AddressForm;
