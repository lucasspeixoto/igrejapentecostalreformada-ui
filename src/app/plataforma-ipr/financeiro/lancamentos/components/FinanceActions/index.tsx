'use client';

import './styles.scss';

import React from 'react';
import { toast } from 'react-toastify';

import { updateTotalBalanceAndCloseCurrentMonth } from '../../../relatorios/lib/firebase/update-finance-reports';
import { useFinanceReportsContext } from '../../../relatorios/providers/FinanceReportsProvider';
import useFinance from '../../../store/useFinance';
import addFinanceNote from '../../lib/firebase/add-finance-note';
import { useFinanceNotesContext } from '../../providers/FinanceNotesProvider';
import type { FinanceNote } from '../../types/finance-note';
import FinanceNoteInsertModal from './FinanceNoteInsertModal';
import MonthlyAuditModal from './MonthlyAuditModal';

const FinanceActions: React.FC = () => {
  const { updateLoadingFinanceNotes, updateIsDataUpdatedInfo } = useFinanceNotesContext();

  const [showInsertNoteModal, setShowInsertNoteModal] = React.useState(false);

  const [showMonthlyAuditModal, setShowMonthlyAuditModal] = React.useState(false);

  const { financeReport } = useFinanceReportsContext();

  const selectedFinanceDetailDate = useFinance(state => state.notesListReferenceMonth);

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
    await updateTotalBalanceAndCloseCurrentMonth();

    // close audit modal
    setShowMonthlyAuditModal(false);
  };

  // Mostrar ações apenas no mês atual
  if (selectedFinanceDetailDate !== financeReport?.currentMonth!) return null;

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
