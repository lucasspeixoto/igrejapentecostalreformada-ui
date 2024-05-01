/* eslint-disable tailwindcss/migration-from-tailwind-2 */

'use client';

import React from 'react';
import { FiUser } from 'react-icons/fi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'react-toastify';

import { SpinnerLogo } from '@/components/common/Icons';
import addData from '@/lib/firebase/firestore/addData';
import { useAuthContext } from '@/providers/AuthContextProvider';

import { usePersonalContext } from '../../../cadastro/pessoal/providers/PersonalContextProvider';

const UserBio: React.FC = () => {
  const authContext = useAuthContext();

  const personalContext = usePersonalContext();

  const [bio, setBio] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);

  const updateUserBioHandler = async () => {
    setIsLoading(true);

    const userPersonalContactCollection = {
      bio,
    };

    const { error } = await addData('users', authContext.authData?.userId!, {
      personal: userPersonalContactCollection,
    });

    if (error) {
      toast.error('Error ao salvar biografia. Tente novamente mais tarde ou contate admin.');
    } else {
      personalContext.updateIsDataUpdatedInfo();

      toast.success('Biografia salva com sucesso!');
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    toast.warn(`Graça e paz 🙏 Mantenha sempre o seu cadastro atualizado.`);
  }, []);

  return (
    <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Dados Pessoais</h3>
      </div>
      <div className="p-7">
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="flex w-full flex-col items-start sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="name">
              Nome Completo
            </label>
            <div className="relative w-full">
              <span className="absolute left-4.5 top-4">
                <FiUser size={20} />
              </span>
              <input
                className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                defaultValue={authContext?.authData?.name!}
                disabled
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="cellphone">
              Celular
            </label>
            <div className="relative w-full">
              <span className="absolute left-4.5 top-4">
                <FiUser size={20} />
              </span>
              <input
                className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
                type="text"
                name="cellphone"
                id="cellphone"
                placeholder="Celular"
                defaultValue={personalContext?.personalData?.cellphone}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mb-5.5 flex w-full flex-col">
          <div className="flex w-full flex-col items-start">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
              E-mail
            </label>
          </div>
          <div className="relative">
            <span className="absolute left-4.5 top-4">
              <MdOutlineMarkEmailUnread size={20} />
            </span>
            <input
              className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              defaultValue={authContext?.authData?.email!}
              disabled
            />
          </div>
        </div>

        <div className="mb-5.5">
          <div className="flex w-full flex-col items-start">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="bio">
              Biografia
            </label>
          </div>
          <div className="relative">
            <span className="absolute left-4.5 top-4">
              <HiOutlinePencilSquare size={20} />
            </span>

            <textarea
              className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
              name="bio"
              id="bio"
              rows={10}
              placeholder="Escreva um resumo sobre você"
              onChange={event => setBio(event.target.value)}
              defaultValue={personalContext?.personalData?.bio}></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center gap-3.5 rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={isLoading}
            onClick={updateUserBioHandler}>
            Salvar
            {isLoading && <SpinnerLogo size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
