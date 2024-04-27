import {
  DELETE_NOTE_CANCEL_TITLE,
  DELETE_NOTE_CONFIRM_TITLE,
  DELETE_NOTE_SUBTITLE,
  DELETE_NOTE_TITLE,
} from '@lancamentos/constants/messages';
import deleteFinanceNote from '@lancamentos/lib/firebase/delete-finance-note';
import { useFinanceNotesContext } from '@lancamentos/providers/FinanceNotesProvider';
import updateFinanceReportsTotalBalance from '@relatorios/lib/firebase/update-finance-reports';
import { useFinanceReportsContext } from '@relatorios/providers/FinanceReportsProvider';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';

import ConfirmModal from '@/components/ConfirmModal';

type FinanceNoteDeleteActionProps = {
  noteId: string;
  type: 'C' | 'D';
  value: number;
};

const FinanceNoteDeleteAction: React.FC<FinanceNoteDeleteActionProps> = ({
  noteId,
  type,
  value,
}) => {
  const financeNotesContext = useFinanceNotesContext();

  const financeReportsContext = useFinanceReportsContext();

  const [showDeleteNoteModal, setShowDeleteNoteModal] = React.useState(false);

  const deleteNoteHandler = (_noteId: string | null) => {
    if (_noteId) {
      setShowDeleteNoteModal(true);
    }
  };

  const computeNewTotalBalance = async () => {
    financeReportsContext.updateLoadingFinanceReports(true);

    const valueToUpdateBalance = type === 'C' ? -value : value;

    await updateFinanceReportsTotalBalance(valueToUpdateBalance);

    financeReportsContext.updateLoadingFinanceReports(false);

    financeReportsContext.updateIsDataUpdatedInfo();
  };

  const onConfirmDeleteNote = async () => {
    financeNotesContext.updateLoadingFinanceNotes(true);

    const { error: deleteNoteError } = await deleteFinanceNote(noteId);

    if (deleteNoteError) {
      toast.error(
        'Error ao excluir nota Tente novamente mais tarde ou contate admin.'
      );
    } else {
      financeNotesContext.updateIsDataUpdatedInfo();
      await computeNewTotalBalance();
      toast.success('Nota excluída com sucesso!');
    }

    financeNotesContext.updateLoadingFinanceNotes(false);

    setShowDeleteNoteModal(false);
  };

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
      <button className="hover:text-meta-7">
        <BiTrash size={20} onClick={() => deleteNoteHandler(noteId)} />
      </button>
    </>
  );
};

export default FinanceNoteDeleteAction;
