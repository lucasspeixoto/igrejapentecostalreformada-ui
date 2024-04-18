import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';

import ConfirmModal from '@/components/ConfirmModal';

import { useFinanceNotesContext } from '../../../../../providers/FinanceNotesProvider';
import {
  DELETE_NOTE_CANCEL_TITLE,
  DELETE_NOTE_CONFIRM_TITLE,
  DELETE_NOTE_SUBTITLE,
  DELETE_NOTE_TITLE,
} from '../../../../constants/messages';
import deleteFinanceNote from '../../../../lib/firebase/delete-finance-note';

type FinanceNoteDeleteActionProps = {
  noteId: string;
};

const FinanceNoteDeleteAction: React.FC<FinanceNoteDeleteActionProps> = ({
  noteId,
}) => {
  const { updateLoadingFinanceNotes, updateIsDataUpdatedInfo } =
    useFinanceNotesContext();

  const [showDeleteNoteModal, setShowDeleteNoteModal] = React.useState(false);

  const deleteNoteHandler = (_noteId: string | null) => {
    if (_noteId) {
      setShowDeleteNoteModal(true);
    }
  };

  const onConfirmDeleteNote = async () => {
    updateLoadingFinanceNotes(true);

    const { error: deleteNoteError } = await deleteFinanceNote(
      'finance-notes',
      noteId
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
