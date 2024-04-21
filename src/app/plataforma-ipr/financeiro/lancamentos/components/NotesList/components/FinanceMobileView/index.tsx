import { useFinanceNotesContext } from '@financeiro/providers/FinanceNotesProvider';
import React from 'react';

import Image from '@/components/Image';
import { formatFirebaseTimestampDate } from '@/utils/transform-date';

import FinanceNoteDeleteAction from '../FinanceNoteDeleteAction';
import FinanceNoteUpdateAction from '../FinanceNoteUpdateAction';

const FinanceMobileView = () => {
  const { financeNotes } = useFinanceNotesContext();

  return (
    <div className="py-2">
      <div className="flex max-w-full flex-wrap items-center justify-center gap-4">
        {React.Children.toArray(
          financeNotes.map(note => (
            <div className="w-[250px] rounded-lg border border-[#ccc] bg-white px-1 py-2 drop-shadow-1 hover:cursor-pointer hover:shadow-default dark:bg-boxdark dark:drop-shadow-none">
              <div className="flex flex-row items-center justify-start gap-2">
                <>
                  {note.photoUrl ? (
                    <Image
                      src={note.photoUrl!}
                      alt="Foto membro"
                      width={42}
                      height={42}
                      className="size-12 rounded-full"
                    />
                  ) : (
                    <Image
                      src={'/images/user/dummy-user.png'}
                      alt="Dummy User"
                      width={42}
                      height={42}
                      className="size-12 rounded-full"
                    />
                  )}
                </>

                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-primary dark:text-white">
                    {note.owner}
                  </p>
                  <p className="text-md font-medium text-meta-3 dark:text-white">
                    {formatFirebaseTimestampDate(note.date)}
                  </p>
                </div>
              </div>

              <span className="mb-2 break-all text-lg font-semibold tracking-tight text-black dark:text-white">
                {note.category}
              </span>

              <p className="text-gray-500 dark:text-gray-400 mb-3 w-full truncate font-normal hover:text-clip">
                {note.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-black dark:text-white">
                  {note.type === 'C' ? (
                    <p className="text-meta-3">R$ {note.value}</p>
                  ) : (
                    <p className="text-meta-7">R$ {note.value}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <FinanceNoteUpdateAction noteId={note.id} />
                  <FinanceNoteDeleteAction noteId={note.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FinanceMobileView;
