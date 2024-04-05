'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { parameters } from '@/app/membros/cadastro/constants/form-parameters';
import { SelectChevroletLogo, SpinnerLogo } from '@/components/common/Icons';
import addData from '@/lib/firebase/firestore/addData';
import { useFirebaseAuthContext } from '@/providers/FirebaseAuthContextProvider';
import type { CreateEcclesiasticalMemberFormData } from '@/schemas/register/ecclesiastical/member-schema';
import { createEcclesiasticalMemberFormSchema } from '@/schemas/register/ecclesiastical/member-schema';

import { useEcclesiasticalContext } from '../../providers/EcclesiasticalContextProvider';

const MemberForm = () => {
  const firebaseAuthContext = useFirebaseAuthContext()!;

  const ecclesiasticalContext = useEcclesiasticalContext()!;

  const [isLoading, setIsLoading] = React.useState(false);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const { membershipOption, craftOption, interestsOption, communitiesOption } =
    parameters;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEcclesiasticalMemberFormData>({
    resolver: zodResolver(createEcclesiasticalMemberFormSchema),
  });

  React.useEffect(() => {
    if (ecclesiasticalContext.ecclesiasticalData) {
      const { membership, craft, communities, interests } =
        ecclesiasticalContext.ecclesiasticalData;
      reset({
        membership,
        craft,
        communities,
        interests,
      });
    }
  }, [ecclesiasticalContext.ecclesiasticalData, isDataUpdated]);

  const getEcclesiasticalMemberDataHandler = async (
    data: CreateEcclesiasticalMemberFormData
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
    <form onSubmit={handleSubmit(getEcclesiasticalMemberDataHandler)}>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Membresia <span className="text-meta-1">*</span>
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              {...register('membership')}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option value="">Selecione o tipo de membro</option>
              {React.Children.toArray(
                membershipOption.map(member => (
                  <option value={member}>{member}</option>
                ))
              )}
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <SelectChevroletLogo size={24} />
            </span>
          </div>
          <>
            {errors.membership && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.membership.message}
              </span>
            )}
          </>
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Oficio <span className="text-meta-1">*</span>
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              {...register('craft')}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option value="">Selecione o ofício</option>
              {React.Children.toArray(
                craftOption.map(craft => <option value={craft}>{craft}</option>)
              )}
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <SelectChevroletLogo size={24} />
            </span>
          </div>
          <>
            {errors.craft && (
              <span className="text-xs text-meta-1 dark:text-meta-7">
                {errors.craft.message}
              </span>
            )}
          </>
        </div>
      </div>

      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Última igreja que frequentou <span className="text-meta-1">*</span>
        </label>
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            {...register('communities')}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="">Selecione a igreja</option>
            {React.Children.toArray(
              communitiesOption.map(community => (
                <option value={community}>{community}</option>
              ))
            )}
          </select>
          <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
            <SelectChevroletLogo size={24} />
          </span>
        </div>
        <>
          {errors.communities && (
            <span className="text-xs text-meta-1 dark:text-meta-7">
              {errors.communities.message}
            </span>
          )}
        </>
      </div>

      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Principal interesse <span className="text-meta-1">*</span>
        </label>
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            {...register('interests')}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
            <option value="">Selecione o interesse</option>
            {React.Children.toArray(
              interestsOption.map(interest => (
                <option value={interest}>{interest}</option>
              ))
            )}
          </select>
          <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
            <SelectChevroletLogo size={24} />
          </span>
        </div>
        <>
          {errors.interests && (
            <span className="text-xs text-meta-1 dark:text-meta-7">
              {errors.interests.message}
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

export default MemberForm;
