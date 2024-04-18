/* eslint-disable max-len */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import React from 'react';
import { createPortal } from 'react-dom';
import { MdOutlineEventNote } from 'react-icons/md';

type FinanceNoteUpdateModalProps = {
  onCancelDetailNoteUpdate: () => void;
  onConfirmDetailNoteUpdate: () => void;
};

const FinanceNoteUpdateModal: React.FC<FinanceNoteUpdateModalProps> = ({
  onCancelDetailNoteUpdate,
  onConfirmDetailNoteUpdate,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== 'Escape') return;

      onCancelDetailNoteUpdate();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  return mounted
    ? createPortal(
        <div className="fixed left-0 top-0 z-999999 flex size-full min-h-screen items-center justify-center bg-black/90 p-2">
          <div className="w-full max-w-142.5 rounded-lg bg-white px-2 py-4 text-center dark:bg-boxdark md:px-5 md:py-7">
            <span className="mx-auto inline-block">
              <MdOutlineEventNote size={48} className="font-bold text-meta-5" />
            </span>
            <h3 className="mb-10 text-xl font-bold text-black dark:text-white sm:text-2xl">
              Editar nota
            </h3>
            <div className="flex w-full flex-wrap justify-center gap-4">
              <button
                onClick={onCancelDetailNoteUpdate}
                className="block w-[100px] rounded border border-meta-7 bg-meta-7 py-3 text-center font-medium text-white transition hover:bg-opacity-90">
                Cancelar
              </button>
              <button
                onClick={onConfirmDetailNoteUpdate}
                className="hover:bg-opacity-900 block w-[100px] rounded border border-meta-3 bg-meta-3 py-3 text-center font-medium text-white transition">
                Alterar
              </button>
            </div>
          </div>
        </div>,
        document.body as Element
      )
    : null;
};

export default FinanceNoteUpdateModal;
