/* eslint-disable max-len */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import React from 'react';
import { createPortal } from 'react-dom';
import { IoWarningOutline } from 'react-icons/io5';

type ConfirmModalProps = {
  title: string;
  subtitle: string;
  cancelTitle: string;
  confirmTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  subtitle,
  cancelTitle,
  confirmTitle,
  onCancel,
  onConfirm,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== 'Escape') return;

      onCancel();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  return mounted
    ? createPortal(
        <div className="fixed left-0 top-0 z-999999 flex size-full min-h-screen items-center justify-center bg-black/90">
          <div className="w-full max-w-142.5 rounded-lg bg-white px-2 py-4 text-center dark:bg-boxdark">
            <span className="mx-auto inline-block">
              <IoWarningOutline size={48} className="font-bold text-meta-8" />
            </span>
            <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
              {title}
            </h3>
            <p className="mb-10">{subtitle}</p>
            <div className="flex w-full flex-wrap justify-center gap-4">
              <button
                onClick={onCancel}
                className="block w-[100px] rounded border border-meta-7 bg-meta-7 py-3 text-center font-medium text-white transition hover:bg-opacity-90">
                {cancelTitle}
              </button>
              <button
                onClick={onConfirm}
                className="hover:bg-opacity-900 block w-[100px] rounded border border-meta-3 bg-meta-3 py-3 text-center font-medium text-white transition">
                {confirmTitle}
              </button>
            </div>
          </div>
        </div>,
        document.body as Element
      )
    : null;
};

export default ConfirmModal;
