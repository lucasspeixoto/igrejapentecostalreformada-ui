'use client';

/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useAuthContext } from '@/providers/AuthContextProvider';
import { usePersonalContext } from '@/providers/register/PersonalContextProvider';

const UserBio: React.FC = () => {
  const authContext = useAuthContext()!;

  const personalContext = usePersonalContext()!;

  React.useEffect(() => {
    toast.warn(`Graça e paz 🙏 Mantenha o seu cadastro atualizado.`);
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-start border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Dados Pessoais
        </h3>
      </div>
      <div className="p-7">
        <form action="#">
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="flex w-full flex-col items-start sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="name">
                Nome Completo
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <FiUser size={20} />
                </span>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nome"
                  defaultValue={personalContext?.personalData?.name}
                />
              </div>
            </div>

            <div className="flex w-full flex-col items-start sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="cellphone">
                Celular
              </label>
              <input
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="cellphone"
                id="cellphone"
                placeholder="Celular"
                defaultValue={personalContext?.personalData?.cellphone}
              />
            </div>
          </div>

          <div className="mb-5.5 flex w-full flex-col">
            <div className="flex w-full flex-col items-start">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="emailAddress">
                E-mail
              </label>
            </div>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <MdOutlineMarkEmailUnread size={20} />
              </span>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="email"
                name="emailAddress"
                id="emailAddress"
                placeholder="E-mail"
                defaultValue={authContext?.user?.email!}
              />
            </div>
          </div>

          <div className="mb-5.5">
            <div className="flex w-full flex-col items-start">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="Username">
                Biografia
              </label>
            </div>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <HiOutlinePencilSquare size={20} />
              </span>

              <textarea
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="bio"
                id="bio"
                rows={6}
                placeholder="Escreva um resumo sobre você"
                defaultValue=""></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4.5">
            <button
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-95"
              type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserBio;
