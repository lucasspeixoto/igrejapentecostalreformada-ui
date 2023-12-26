/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';

type ModalProps = {
  title: string;
  subtitle: string;
  cancelTitle: string;
  confirmTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  cancelTitle,
  confirmTitle,
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
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center md:px-17.5 md:py-15 dark:bg-boxdark">
        <span className="mx-auto inline-block">
          <IoWarningOutline size={48} className="font-bold text-meta-8" />
        </span>
        <h3 className="mt-5.5 pb-2 text-xl font-bold text-black sm:text-2xl dark:text-white">
          {title}
        </h3>
        <p className="mb-10">{subtitle}</p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onCancel}
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              {cancelTitle}
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onConfirm}
              className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90">
              {confirmTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
