import { useFinanceNotesContext } from '@lancamentos/providers/FinanceNotesProvider';
import React from 'react';
import { FaEye } from 'react-icons/fa';

import Image from '@/components/Image';
import Tooltip from '@/components/Tooltip';
import { formatFirebaseTimestampDate } from '@/utils/transform-date';

import FinanceNoteDeleteAction from '../FinanceNoteDeleteAction';
import FinanceNoteUpdateAction from '../FinanceNoteUpdateAction';
import FinanceTableColumns from '../FinanceTableColumns';

const FinanceDesktopView = () => {
  const { financeNotes } = useFinanceNotesContext();

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <FinanceTableColumns />
          <tbody>
            {React.Children.toArray(
              financeNotes.map(note => (
                <tr className="hover:cursor-pointer hover:bg-gray-2 hover:dark:bg-meta-4">
                  <td className="w-auto border-b border-[#eee] px-1 py-5 pl-9 dark:border-strokedark xl:pl-5">
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
                      <p className="hidden text-black dark:text-white sm:block">{note.owner}</p>
                    </div>
                  </td>
                  <td className="w-auto border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{formatFirebaseTimestampDate(note.date)}</p>
                  </td>
                  <td className="w-auto border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {note.type === 'C' ? (
                        <span className="text-meta-3">Crédito</span>
                      ) : (
                        <span className="text-meta-7">Débito</span>
                      )}
                    </p>
                  </td>
                  <td className="w-auto border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{note.category}</p>
                  </td>
                  <td className="w-auto border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{note.value}</p>
                  </td>
                  <td className="w-auto border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Tooltip className="hover:text-meta-3" text={note.description}>
                        <FaEye size={18} />
                      </Tooltip>
                      <FinanceNoteUpdateAction noteId={note.id} />
                      <FinanceNoteDeleteAction noteId={note.id} value={note.value} type={note.type} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceDesktopView;
