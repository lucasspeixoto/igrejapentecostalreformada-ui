/* eslint-disable max-len */

'use client';

import { Timestamp } from 'firebase/firestore';
import React from 'react';

import addFinanceNote from '../../lib/firebase/add-finance-note';
import type { FinanceNote } from '../../types/finance-note';
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
  const onConfirmInsertNote = async () => {
    const newFinanceNote: Partial<FinanceNote> = {
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=13114439-e212-4819-a510-a379c820ef9e',
      description: 'Compra de Microfones Sem Fio',
      owner: 'Lucas',
      date: Timestamp.fromDate(new Date()),
      type: 'D',
      value: 150.0,
    };

    await addFinanceNote(newFinanceNote);

    setShowInsertNoteModal(false);
  };

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
