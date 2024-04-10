/* eslint-disable max-len */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import React from 'react';
import { MdOutlineEventNote } from 'react-icons/md';

type FinanceNoteUpdateProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const FinanceNoteUpdate: React.FC<FinanceNoteUpdateProps> = ({
  onCancel,
  onConfirm,
}) => {
  /* Used to add an event listener for the 'keydown'
  event on the document object and close the Modal that is
  opened. */
  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== 'Escape') return;

      onCancel();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 p-2">
      <div className="w-full max-w-142.5 rounded-lg bg-white px-2 py-4 text-center md:px-5 md:py-7 dark:bg-boxdark">
        <span className="mx-auto inline-block">
          <MdOutlineEventNote size={48} className="font-bold text-meta-5" />
        </span>
        <h3 className="mt-1 text-xl font-bold text-black sm:text-2xl dark:text-white">
          Editar nota
        </h3>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onCancel}
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-secondary hover:bg-secondary hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white">
              Cancelar
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onConfirm}
              className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceNoteUpdate;
