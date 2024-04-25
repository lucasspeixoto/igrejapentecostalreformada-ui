import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

import FinanceNoteUpdateModal from './FinanceNoteUpdateModal';

type FinanceNoteUpdateActionProps = {
  noteId: string;
};

const FinanceNoteUpdateAction: React.FC<FinanceNoteUpdateActionProps> = ({
  noteId,
}) => {
  const [showDetailNoteModal, setShowDetailNoteModal] = React.useState(false);

  const seeNoteDetailHandler = () => {
    setShowDetailNoteModal(true);
  };

  const onCancelDetailNote = () => {
    setShowDetailNoteModal(false);
  };

  return (
    <>
      <>
        {showDetailNoteModal ? (
          <FinanceNoteUpdateModal
            noteId={noteId}
            onCancelDetailNoteUpdate={onCancelDetailNote}
          />
        ) : null}
      </>
      <button className="hover:text-meta-5">
        <FaPencilAlt size={18} onClick={() => seeNoteDetailHandler()} />
      </button>
    </>
  );
};

export default FinanceNoteUpdateAction;
