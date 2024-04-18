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
import ConfirmModal from '@/components/ConfirmModal';
import { useAuthContext } from '@/providers/AuthContextProvider';
import { formatFirebaseTimestampDate } from '@/utils/transform-date';

import { useFinanceNotesContext } from '../../../providers/FinanceNotesProvider';
import {
  DELETE_NOTE_CANCEL_TITLE,
  DELETE_NOTE_CONFIRM_TITLE,
  DELETE_NOTE_SUBTITLE,
  DELETE_NOTE_TITLE,
} from '../../constants/messages';
import deleteFinanceNote from '../../lib/firebase/delete-finance-note';
import FinanceNoteUpdate from '../FinanceNoteUpdate';
import TableHeaderInfo from './TableHeaderInfo';

const NotesList: React.FC = () => {
  const userContext = useAuthContext();

  const {
    financeNotes,
    isLoadingFinanceNotes,
    updateLoadingFinanceNotes,
    updateIsDataUpdatedInfo,
  } = useFinanceNotesContext();

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const [noteId, setNoteId] = React.useState<string | null>(null);

  const [showDeleteNoteModal, setShowDeleteNoteModal] = React.useState(false);

  const [showDetailNoteModal, setShowDetailNoteModal] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const isAdmin = userContext.authData?.isAdmin!;

    setIsAdminOption(isAdmin);

    if (isAdmin === false) {
      router.push('/plataforma-ipr/perfil');
    }
  }, [userContext]);

  const deleteNoteHandler = (_noteId: string) => {
    setNoteId(_noteId);

    setShowDeleteNoteModal(true);
  };

  const onConfirmDeleteNote = async () => {
    updateLoadingFinanceNotes(true);

    const { error: deleteNoteError } = await deleteFinanceNote(
      'finance-notes',
      noteId!
    );

    if (deleteNoteError) {
      toast.error(
        'Error ao excluir nota Tente novamente mais tarde ou contate admin.'
      );
    } else {
      updateIsDataUpdatedInfo();
      toast.success('Nota excluída com sucesso!');
    }

    updateLoadingFinanceNotes(false);

    setShowDeleteNoteModal(false);
  };

  const seeNoteDetailHandler = (_noteId: string) => {
    setNoteId(_noteId);
    setShowDetailNoteModal(true);
  };

  const onCancelDetailNote = () => {
    setShowDetailNoteModal(false);
  };

  const onConfirmDetailNote = async () => {};

  return (
    <>
      <>
        {showDeleteNoteModal ? (
          <ConfirmModal
            title={DELETE_NOTE_TITLE}
            subtitle={DELETE_NOTE_SUBTITLE}
            cancelTitle={DELETE_NOTE_CANCEL_TITLE}
            confirmTitle={DELETE_NOTE_CONFIRM_TITLE}
            onCancel={() => setShowDeleteNoteModal(false)}
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
            {isLoadingFinanceNotes || !financeNotes.length ? (
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
                            <tr className="hover:bg-gray-2 hover:dark:bg-meta-4 hover:cursor-pointer">
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
                                          className="size-8 rounded-full"
                                        />
                                      ) : (
                                        <Image
                                          src={'/images/user/dummy-user.png'}
                                          alt="Dummy User"
                                          width={36}
                                          height={36}
                                          className="size-8 rounded-full"
                                        />
                                      )}
                                    </>
                                  </div>
                                  <p className="hidden text-black sm:block dark:text-white">
                                    {note.owner}
                                  </p>
                                </div>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {formatFirebaseTimestampDate(note.date)}
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
