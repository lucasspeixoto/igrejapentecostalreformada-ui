/* eslint-disable max-len */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable prettier/prettier */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import Loader from '@/components/common/Loader';
import { useAuthContext } from '@/providers/AuthContextProvider';
import { formatFirebaseTimestampDate } from '@/utils/transform-date';

import { useFinanceNotesContext } from '../../../providers/FinanceNotesProvider';
import FinanceNoteDeleteAction from './components/FinanceNoteDeleteAction';
import FinanceNoteUpdateAction from './components/FinanceNoteUpdateAction';
import TableHeaderInfo from './components/TableHeaderInfo';

const NotesList: React.FC = () => {
  const userContext = useAuthContext();

  const { financeNotes, isLoadingFinanceNotes } = useFinanceNotesContext();

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const isAdmin = userContext.authData?.isAdmin!;

    setIsAdminOption(isAdmin);

    if (isAdmin === false) {
      router.push('/plataforma-ipr/perfil');
    }
  }, [userContext]);

  return (
    <>
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
                                  <FinanceNoteUpdateAction noteId={note.id} />
                                  <FinanceNoteDeleteAction noteId={note.id} />
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
