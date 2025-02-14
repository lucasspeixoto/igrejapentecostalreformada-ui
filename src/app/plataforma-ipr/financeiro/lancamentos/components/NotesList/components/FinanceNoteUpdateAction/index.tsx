import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

import FinanceNoteUpdateModal from './FinanceNoteUpdateModal';

type FinanceNoteUpdateActionProps = {
  isSelectedMonthTheCurrentMonth: boolean;
  noteId: string;
};

const FinanceNoteUpdateAction: React.FC<FinanceNoteUpdateActionProps> = ({
  isSelectedMonthTheCurrentMonth,
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
          <FinanceNoteUpdateModal noteId={noteId} onCancelDetailNoteUpdate={onCancelDetailNote} />
        ) : null}
      </>
      <button
        disabled={isSelectedMonthTheCurrentMonth}
        className="hover:text-meta-5 disabled:cursor-not-allowed disabled:opacity-40">
        <FaPencilAlt size={18} onClick={() => seeNoteDetailHandler()} />
      </button>
    </>
  );
};

export default FinanceNoteUpdateAction;
