/* eslint-disable max-len */

'use client';

import React from 'react';

import { useFinanceNotesContext } from '../../../providers/FinanceNotesProvider';
import addFinanceNote from '../../lib/firebase/add-finance-note';
import type { FinanceNote } from '../../types/finance-note';
import FinanceNoteInsert from './FinanceNoteInsert';

const FinanceActions: React.FC = () => {
  const { financeNotes, updateLoadingFinanceNotes, updateIsDataUpdatedInfo } =
    useFinanceNotesContext();

  const [showInsertNoteModal, setShowInsertNoteModal] = React.useState(false);

  const onCancelInsertNote = () => {
    setShowInsertNoteModal(false);
  };

  const insertNoteHandler = async (newFinanceNote: Partial<FinanceNote>) => {
    updateLoadingFinanceNotes(true);

    await addFinanceNote(newFinanceNote);

    updateIsDataUpdatedInfo();

    updateLoadingFinanceNotes(false);

    setShowInsertNoteModal(false);
  };

  return (
    <>
      {financeNotes.length > 0 ? (
        <>
          <>
            {showInsertNoteModal ? (
              <FinanceNoteInsert
                onCancel={onCancelInsertNote}
                insertNoteHandler={insertNoteHandler}
              />
            ) : null}
          </>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInsertNoteModal(true)}
              type="button"
              className="max-w-[80px] cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              Novo
            </button>
            <button
              type="button"
              className="max-w-[80px] cursor-pointer rounded-lg border border-meta-8 bg-meta-8 p-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              Auditoria
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default FinanceActions;
