/* eslint-disable tailwindcss/migration-from-tailwind-2 */

'use client';

import React from 'react';
import { FiUser } from 'react-icons/fi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'react-toastify';

import { SpinnerLogo } from '@/components/common/Icons';
import Image from '@/components/Image';
import addData from '@/lib/firebase/firestore/addData';
import { usePersonalContext } from '@/providers/register/PersonalContextProvider';

type UserBaseDataProps = {
  userId: string;
  name: string;
  cellphone: string;
  comments: string;
  email: string;
  photoUrl: string;
  role: string;
  isAdmin: boolean;
  isRegistered: boolean;
};

const UserBaseData: React.FC<UserBaseDataProps> = ({
  userId,
  name,
  cellphone,
  comments,
  email,
  photoUrl,
  role,
  isAdmin,
  isRegistered,
}) => {
  const hasPhotoUploaded = !!photoUrl;

  const personalContext = usePersonalContext()!;

  const [isLoading, setIsLoading] = React.useState(false);

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const [isRegisteredOption, setIsRegisteredOption] = React.useState(false);

  const [newComments, setNewComments] = React.useState('');

  /* Used to update the `isAdminOption` state
  variable when the `isAdmin` prop changes. */
  React.useEffect(() => {
    let mounted = true;

    (async () => {
      if (isAdmin && mounted) {
        setIsAdminOption(isAdmin);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isAdmin]);

  /* Used to update the `isRegisteredOption` state
  variable when the `isRegistered` prop changes. */
  React.useEffect(() => {
    let mounted = true;

    (async () => {
      if (isRegistered && mounted) {
        setIsRegisteredOption(isRegistered);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isRegistered]);

  /* Used to update the `newComments` state variable whenever
   the `comments` prop changes. */
  React.useEffect(() => {
    let mounted = true;

    (async () => {
      if (comments && mounted) {
        setNewComments(comments);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [comments]);

  /**
   * The function `updateUserDataHandler` updates user data by adding new comments,
   * setting admin status, and registration status, and displays success or error
   * messages.
   */
  const updateUserDataHandler = async () => {
    setIsLoading(true);

    const { error } = await addData('users', userId, {
      personal: { comments: newComments },
      auth: { isAdmin: isAdminOption },
      process: { isRegistered: isRegisteredOption },
    });

    if (error) {
      toast.error(
        'Error ao salvar dados do membro. Tente novamente mais tarde ou contate admim.'
      );
    } else {
      personalContext.updateIsDataUpdatedInfo();

      toast.success('Dados de membro salvos com sucesso!');
    }

    setIsLoading(false);
  };

  return (
    <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Dados Pessoais
        </h3>
      </div>
      <div className="p-7">
        <div className="mb-5.5 flex gap-3">
          <div>
            {hasPhotoUploaded ? (
              <Image
                width={55}
                height={55}
                className="h-14 w-14 rounded-full"
                src={photoUrl}
                alt="Foto pessoal"
              />
            ) : (
              <Image
                width={55}
                height={55}
                className="rounded-full"
                src={'/images/user/dummy-user.png'}
                alt="Foto pessoal"
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-md font-bold text-black dark:text-white">
              {name}
            </span>
            <span className="text-sm text-black dark:text-white">{role}</span>
          </div>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="flex w-full flex-col items-start sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="role">
              Atuação
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <FiUser size={20} />
              </span>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="role"
                id="role"
                placeholder="Atuação"
                disabled
                defaultValue={role}
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
              disabled
              defaultValue={cellphone}
            />
          </div>
        </div>

        <div className="mb-5.5 flex w-full flex-col">
          <div className="flex w-full flex-col items-start">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="email">
              E-mail
            </label>
          </div>
          <div className="relative">
            <span className="absolute left-4.5 top-4">
              <MdOutlineMarkEmailUnread size={20} />
            </span>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark  dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              disabled
              defaultValue={email}
            />
          </div>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="flex w-full flex-col items-start sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Administrador
            </label>

            <div>
              <label
                htmlFor="isAdmin"
                className="flex cursor-pointer select-none items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    className="sr-only"
                    onChange={() => {
                      setIsAdminOption(state => !state);
                    }}
                  />
                  <div className="block h-8 w-14 rounded-full bg-gray dark:bg-meta-4"></div>
                  <div
                    className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-meta-7 transition ${
                      isAdminOption && '!right-1 !translate-x-full !bg-meta-3'
                    }`}></div>
                </div>
              </label>
            </div>
          </div>

          <div className="flex w-full flex-col items-start sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="cellphone">
              Cadastro Finalizado
            </label>
            <div>
              <label
                htmlFor="isRegistered"
                className="flex cursor-pointer select-none items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="isRegistered"
                    className="sr-only"
                    onChange={() => {
                      setIsRegisteredOption(state => !state);
                    }}
                  />
                  <div className="block h-8 w-14 rounded-full bg-gray dark:bg-meta-4"></div>
                  <div
                    className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-meta-7 transition ${
                      isRegisteredOption &&
                      '!right-1 !translate-x-full !bg-meta-3'
                    }`}></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="mb-5.5">
          <div className="flex w-full flex-col items-start">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="bio">
              Comentários
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
              rows={10}
              placeholder="Escreva aqui comentários referente ao irmão(ã)."
              onChange={event => setNewComments(event.target.value)}
              defaultValue={comments}></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center gap-3.5 rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={isLoading}
            onClick={updateUserDataHandler}>
            Salvar
            {isLoading && <SpinnerLogo size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBaseData;
