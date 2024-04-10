/* eslint-disable max-len */

'use client';

import React from 'react';

import FinanceNoteInsert from '../FinanceNoteInsert';

const FinanceActions: React.FC = () => {
  const [showInsertNoteModal, setShowInsertNoteModal] = React.useState(false);

  const insertNoteHandler = () => {
    setShowInsertNoteModal(true);
  };

  //! New
  const onCancelInsertNote = () => {
    setShowInsertNoteModal(false);
  };

  //! New
  const onConfirmInsertNote = async () => {};

  return (
    <>
      <>
        {showInsertNoteModal ? (
          <FinanceNoteInsert
            onCancel={onCancelInsertNote}
            onConfirm={onConfirmInsertNote}
          />
        ) : null}
      </>
      <div className="flex gap-2">
        <button
          onClick={insertNoteHandler}
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
  );
};

export default FinanceActions;
