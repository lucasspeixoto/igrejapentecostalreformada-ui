/* eslint-disable max-len */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable prettier/prettier */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineCheckCircle, AiOutlineEye } from 'react-icons/ai';
import { BiBlock, BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';

import Loader from '@/components/common/Loader';
import Modal from '@/components/Modal';
import deleteData from '@/lib/firebase/firestore/deleteData';
import deletePhoto from '@/lib/firebase/firestore/deletePhoto';
import { getUsersDocuments } from '@/lib/firebase/firestore/getData';
import { useAuthContext } from '@/providers/AuthContextProvider';
import type { UserData } from '@/types/user-data';
import { orderMembersListByName } from '@/utils/array-operations';

import useFinanceDetailDate from '../../store/useFinanceDetailDate';

const DELETE_MODAL_TITLE = 'Deletar membro';

const DELETE_MODAL_SUBTITLE =
  'Deseja realmente deletar este usuário ? A exclusão remove todos os dados ja cadastrados.';
const DELETE_MODAL_CANCEL_TITLE = 'Cancelar';
const DELETE_MODAL_CONFIRM_TITLE = 'Confirmar';

const Releases: React.FC = () => {
  const userContext = useAuthContext();

  const [userLoadedData, setUserLoadedData] = React.useState<UserData[]>([]);

  const [isLoadingUsers, setIsLoadingUsers] = React.useState(true);

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const [userId, setUserId] = React.useState<string | null>(null);

  const [showDeleteUserModal, setShowDeleteUserModal] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      const { userData } = await getUsersDocuments();

      const isAdmin = userContext.authData?.isAdmin!;

      setIsAdminOption(isAdmin);

      if (isAdmin === false) {
        router.push('/plataforma-ipr/perfil');
      }

      if (userData && mounted) {
        setUserLoadedData(userData);
        setIsLoadingUsers(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userContext]);

  /**
   * The function `seeUserDetailHandler` navigates to a user detail page using the
   * provided user ID.
   * @param {string} userId - A string representing the unique identifier of a
   * user.
   */
  const seeUserDetailHandler = (selectedUserId: string) => {
    setUserId(selectedUserId);
    router.push(`detalhe-irmao/${selectedUserId}`);
  };

  /**
   * The deleteUserHandler function sets the selectedUserId and
   * setShowDeleteUserModal state variables.
   * @param {string} selectedUserId - The selectedUserId parameter is a string that
   * represents the ID of the user that is selected for deletion.
   */
  const deleteUserHandler = (selectedUserId: string) => {
    setUserId(selectedUserId);
    setShowDeleteUserModal(true);
  };

  /**
   * The function onCancelDeleteUser sets the state variable setShowDeleteUserModal
   * to false.
   */
  const onCancelDeleteUser = () => {
    setShowDeleteUserModal(false);
  };

  /**
   * The function `onConfirmDeleteUser` updates the loading state, hides the delete
   * user modal, deletes user data and photo, and displays a success or error
   * message.
   */
  const onConfirmDeleteUser = async () => {
    userContext.updateIsLoadingData(true);

    setShowDeleteUserModal(false);

    const { error: deleteUserDataError } = await deleteData('users', userId!);

    const { error: deletePhotoError } = await deletePhoto('photos', userId!);

    if (deleteUserDataError || deletePhotoError) {
      toast.error(
        'Error ao excluir dados de membro. Tente novamente mais tarde ou contate admin.'
      );
    } else {
      toast.success('Dados de membros excluídos com sucesso!');
    }

    userContext.updateIsLoadingData(false);
  };

  //! New
  const selectedFinanceDetailDate = useFinanceDetailDate(
    state => state.selectedFinanceDetailDate
  );

  return (
    <>
      <>
        {showDeleteUserModal ? (
          <Modal
            title={DELETE_MODAL_TITLE}
            subtitle={DELETE_MODAL_SUBTITLE}
            cancelTitle={DELETE_MODAL_CANCEL_TITLE}
            confirmTitle={DELETE_MODAL_CONFIRM_TITLE}
            onCancel={onCancelDeleteUser}
            onConfirm={onConfirmDeleteUser}
          />
        ) : null}
      </>
      {isAdminOption ? (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
          <div className="mb-2 flex flex-col justify-start gap-1">
            <p className="text-xl font-semibold text-black dark:text-white">
              Notas Lançadas{' '}
              <span className="font-bold text-meta-6 text-lg mt-1 ml-2">
                {selectedFinanceDetailDate}
              </span>
            </p>
          </div>

          <div className="pb-10">
            {isLoadingUsers || !userLoadedData.length ? (
              <Loader />
            ) : (
              <>
                <div className="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
                  <div className="max-w-full overflow-x-auto ">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="min-w-[220px] p-4 font-medium text-black dark:text-white xl:pl-11">
                            Responsável
                          </th>
                          <th className="min-w-[150px] p-4 font-medium text-black dark:text-white">
                            Atuação
                          </th>
                          <th className="min-w-[120px] p-4 font-medium text-black dark:text-white">
                            Perfil
                          </th>
                          <th className="min-w-[120px] p-4 font-medium text-black dark:text-white">
                            Cadastro
                          </th>
                          <th className="p-4 font-medium text-black dark:text-white">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {React.Children.toArray(
                          userLoadedData
                            ?.sort(orderMembersListByName)
                            .map(member => (
                              <tr>
                                <td className="border-b border-[#eee] px-1 py-5 pl-9 xl:pl-5 dark:border-strokedark">
                                  <div className="flex flex-row items-center gap-4 font-medium text-black dark:text-white">
                                    <div className="shrink-0">
                                      <>
                                        {member.auth?.photoUrl ? (
                                          <Image
                                            src={member.auth?.photoUrl!}
                                            alt="Foto membro"
                                            width={48}
                                            height={48}
                                            className="h-14 w-14 rounded-full"
                                          />
                                        ) : (
                                          <Image
                                            src={'/images/user/dummy-user.png'}
                                            alt="Brand"
                                            width={48}
                                            height={48}
                                            className="h-14 w-14 rounded-full"
                                          />
                                        )}
                                      </>
                                    </div>
                                    <p className="hidden text-black sm:block dark:text-white">
                                      {member.auth?.name.split(' ')[0]}{' '}
                                    </p>
                                  </div>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                  <p className="text-black dark:text-white">
                                    {member?.auth?.role}
                                  </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                  <p className="text-black dark:text-white">
                                    {member?.auth?.isAdmin ? 'Admin' : 'Membro'}
                                  </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                  <p className="text-black dark:text-white">
                                    {member?.process?.isRegistered ? (
                                      <AiOutlineCheckCircle
                                        size={20}
                                        className="text-meta-3"
                                      />
                                    ) : (
                                      <BiBlock
                                        size={20}
                                        className="text-meta-7"
                                      />
                                    )}
                                  </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                  <div className="flex items-center space-x-3.5">
                                    <button className="hover:text-meta-5">
                                      <AiOutlineEye
                                        size={20}
                                        onClick={() =>
                                          seeUserDetailHandler(
                                            member?.auth.userId
                                          )
                                        }
                                      />
                                    </button>
                                    <button
                                      className="hover:text-meta-7"
                                      onClick={() =>
                                        deleteUserHandler(member?.auth.userId)
                                      }>
                                      <BiTrash size={20} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Releases;
