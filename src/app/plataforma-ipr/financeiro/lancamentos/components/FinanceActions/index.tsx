/* eslint-disable max-len */

'use client';

import React from 'react';
import { toast } from 'react-toastify';

import addFinanceNote from '../../lib/firebase/add-finance-note';
import { useFinanceNotesContext } from '../../providers/FinanceNotesProvider';
import type { FinanceNote } from '../../types/finance-note';
import FinanceNoteInsertModal from './FinanceNoteInsertModal';
import MonthlyAuditModal from './MonthlyAuditModal';

const FinanceActions: React.FC = () => {
  const { updateLoadingFinanceNotes, updateIsDataUpdatedInfo } = useFinanceNotesContext();

  const [showInsertNoteModal, setShowInsertNoteModal] = React.useState(false);

  const [showMonthlyAuditModal, setShowMonthlyAuditModal] = React.useState(false);

  const onCancelInsertNote = () => setShowInsertNoteModal(false);

  const onCancelAudit = () => setShowMonthlyAuditModal(false);

  const insertNoteHandler = async (newFinanceNote: Partial<FinanceNote>) => {
    updateLoadingFinanceNotes(true);

    await addFinanceNote(newFinanceNote);

    updateIsDataUpdatedInfo();

    updateLoadingFinanceNotes(false);

    toast.success('Nota adicionada com sucesso!');
  };

  return (
    <>
      <>
        {showInsertNoteModal ? (
          <FinanceNoteInsertModal
            onCancelInsertNote={onCancelInsertNote}
            insertNoteHandler={insertNoteHandler}
          />
        ) : null}
      </>
      <>
        {showMonthlyAuditModal ? (
          <MonthlyAuditModal onCancelAudit={onCancelAudit} processMonthlyAuditHandler={() => {}} />
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
          onClick={() => setShowMonthlyAuditModal(true)}
          type="button"
          className="max-w-[80px] cursor-pointer rounded-lg border border-meta-8 bg-meta-8 p-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          Auditoria
        </button>
      </div>
    </>
  );
};

export default FinanceActions;
