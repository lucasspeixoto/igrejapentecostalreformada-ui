/* eslint-disable max-len */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable prettier/prettier */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Loader from '@/components/common/Loader';
import Modal from '@/components/Modal';
import deleteData from '@/lib/firebase/firestore/deleteData';
import deletePhoto from '@/lib/firebase/firestore/deletePhoto';
import { getUsersDocuments } from '@/lib/firebase/firestore/getData';
import { useAuthContext } from '@/providers/AuthContextProvider';
import type { UserData } from '@/types/user-data';
import { formatDate } from '@/utils/transform-date';

import { MOCKED_FINANCE_NOTES } from '../../__mocks__/finance-notes';
import {
  DELETE_NOTE_CANCEL_TITLE,
  DELETE_NOTE_CONFIRM_TITLE,
  DELETE_NOTE_SUBTITLE,
  DELETE_NOTE_TITLE,
} from '../../constants/messages';
import FinanceNoteUpdate from '../FinanceNoteUpdate';
import TableHeaderInfo from './TableHeaderInfo';

const NotesList: React.FC = () => {
  const userContext = useAuthContext();

  const [userLoadedData, setUserLoadedData] = React.useState<UserData[]>([]);

  const [isLoadingUsers, setIsLoadingUsers] = React.useState(true);

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const [noteId, setNoteId] = React.useState<string | null>(null);

  const [showDeleteNoteModal, setShowDeleteNoteModal] = React.useState(false);

  const [showDetailNoteModal, setShowDetailNoteModal] = React.useState(false);

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

  const deleteNoteHandler = (_noteId: string) => {
    setNoteId(_noteId);
    setShowDeleteNoteModal(true);
  };

  const onCancelDeleteNote = () => {
    setShowDeleteNoteModal(false);
  };

  const onConfirmDeleteNote = async () => {
    userContext.updateIsLoadingData(true);

    setShowDeleteNoteModal(false);

    const { error: deleteUserDataError } = await deleteData('users', noteId!);

    const { error: deletePhotoError } = await deletePhoto('photos', noteId!);

    if (deleteUserDataError || deletePhotoError) {
      toast.error(
        'Error ao excluir dados de membro. Tente novamente mais tarde ou contate admin.'
      );
    } else {
      toast.success('Dados de membros excluídos com sucesso!');
    }

    userContext.updateIsLoadingData(false);
  };

  const seeNoteDetailHandler = (_noteId: string) => {
    setNoteId(_noteId);
    setShowDetailNoteModal(true);
  };

  //! New
  const financeNotes = MOCKED_FINANCE_NOTES;

  //! New
  const onCancelDetailNote = () => {
    setShowDetailNoteModal(false);
  };

  //! New
  const onConfirmDetailNote = async () => {};

  return (
    <>
      <>
        {showDeleteNoteModal ? (
          <Modal
            title={DELETE_NOTE_TITLE}
            subtitle={DELETE_NOTE_SUBTITLE}
            cancelTitle={DELETE_NOTE_CANCEL_TITLE}
            confirmTitle={DELETE_NOTE_CONFIRM_TITLE}
            onCancel={onCancelDeleteNote}
            onConfirm={onConfirmDeleteNote}
          />
        ) : null}
      </>
      <>
        {showDetailNoteModal ? (
          <FinanceNoteUpdate
            onCancel={onCancelDetailNote}
            onConfirm={onConfirmDetailNote}
          />
        ) : null}
      </>
      {isAdminOption ? (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
          <TableHeaderInfo />

          <div className="pb-10">
            {isLoadingUsers || !userLoadedData.length ? (
              <Loader />
            ) : (
              <>
                <div className="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="min-w-[220px] p-4 font-medium text-black dark:text-white xl:pl-11">
                            Nota
                          </th>
                          <th className="min-w-[150px] p-4 font-medium text-black dark:text-white">
                            Autor
                          </th>
                          <th className="min-w-[120px] p-4 font-medium text-black dark:text-white">
                            Inclusão
                          </th>
                          <th className="min-w-[120px] p-4 font-medium text-black dark:text-white">
                            Tipo
                          </th>
                          <th className="p-4 font-medium text-black dark:text-white">
                            Valor (R$)
                          </th>
                          <th className="p-4 font-medium text-black dark:text-white">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {React.Children.toArray(
                          financeNotes.map(note => (
                            <tr>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {note.description}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-1 py-5 pl-9 xl:pl-5 dark:border-strokedark">
                                <div className="flex flex-row items-center gap-4 font-medium text-black dark:text-white">
                                  <div className="shrink-0">
                                    <>
                                      {note.photoUrl ? (
                                        <Image
                                          src={note.photoUrl!}
                                          alt="Foto membro"
                                          width={36}
                                          height={36}
                                          className="h-8 w-8 rounded-full"
                                        />
                                      ) : (
                                        <Image
                                          src={'/images/user/dummy-user.png'}
                                          alt="Dummy User"
                                          width={36}
                                          height={36}
                                          className="h-8 w-8 rounded-full"
                                        />
                                      )}
                                    </>
                                  </div>
                                  <p className="hidden text-black sm:block dark:text-white">
                                    {note.owner?.split(' ')[0]}{' '}
                                  </p>
                                </div>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {formatDate(note.date)}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {note.type === 'C' ? (
                                    <span className="text-meta-3">Crédito</span>
                                  ) : (
                                    <span className="text-meta-7">Débito</span>
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {note.value}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                  <button className="hover:text-meta-5">
                                    <FaPencilAlt
                                      size={18}
                                      onClick={() =>
                                        seeNoteDetailHandler(note.id)
                                      }
                                    />
                                  </button>
                                  <button className="hover:text-meta-7">
                                    <BiTrash
                                      size={20}
                                      onClick={() => deleteNoteHandler(note.id)}
                                    />
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

export default NotesList;
