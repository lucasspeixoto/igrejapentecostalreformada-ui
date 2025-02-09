/* eslint-disable max-len */

'use client';

import './styles.scss';

import { updateTotalBalanceAndCloseCurrentMonth } from '@relatorios/lib/firebase/update-finance-reports';
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

  const processMonthlyAuditHandler = async () => {
    // console.log('Fechamento mês!');

    await updateTotalBalanceAndCloseCurrentMonth();
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
          <MonthlyAuditModal
            onCancelAudit={onCancelAudit}
            processMonthlyAuditHandler={processMonthlyAuditHandler}
          />
        ) : null}
      </>
      <div className="notes-actions">
        <button
          className="notes-actions__new-note"
          onClick={() => setShowInsertNoteModal(true)}
          type="button">
          Novo
        </button>
        <button className="notes-actions__audit" onClick={() => setShowMonthlyAuditModal(true)} type="button">
          Auditoria
        </button>
      </div>
    </>
  );
};

export default FinanceActions;
