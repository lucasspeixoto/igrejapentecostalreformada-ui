/* eslint-disable max-len */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import { getFinanceNote } from '@financeiro/lancamentos/lib/firebase/get-finance-notes';
import updateFinanceNote from '@financeiro/lancamentos/lib/firebase/update-finance-note';
import type { UpdateFinanceNoteFormData } from '@financeiro/lancamentos/schemas/update-finance-note-schema';
import { updateFinanceNoteFormSchema } from '@financeiro/lancamentos/schemas/update-finance-note-schema';
import type { FinanceNote } from '@financeiro/lancamentos/types/finance-note';
import { useFinanceNotesContext } from '@financeiro/providers/FinanceNotesProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { MdOutlineEventNote } from 'react-icons/md';
import { toast } from 'react-toastify';

import { SelectChevroletLogo } from '@/components/common/Icons';

type FinanceNoteUpdateModalProps = {
  noteId: string;
  onCancelDetailNoteUpdate: () => void;
};

const FinanceNoteUpdateModal: React.FC<FinanceNoteUpdateModalProps> = ({
  noteId,
  onCancelDetailNoteUpdate,
}) => {
  const { updateLoadingFinanceNotes, updateIsDataUpdatedInfo } =
    useFinanceNotesContext();

  const [mounted, setMounted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateFinanceNoteFormData>({
    resolver: zodResolver(updateFinanceNoteFormSchema),
  });

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== 'Escape') return;

      onCancelDetailNoteUpdate();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  const [selectedFinanceNote, setSelectedFinanceNote] =
    React.useState<FinanceNote | null>(null);

  React.useEffect(() => {
    const financeNoteData = getFinanceNote(noteId);

    financeNoteData
      .then(data => {
        if (data) {
          setSelectedFinanceNote(data.financeNote);
          const { type, value, description } = data.financeNote;

          reset({ type, value, description });
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }, []);

  const updateFinanceNoteHandler = async (
    formData: UpdateFinanceNoteFormData
  ) => {
    updateLoadingFinanceNotes(true);

    const { error: updateNoteError } = await updateFinanceNote(
      noteId,
      formData
    );

    if (updateNoteError) {
      toast.error(
        'Error ao alterar nota Tente novamente mais tarde ou contate admin.'
      );
    } else {
      updateIsDataUpdatedInfo();
      toast.success('Nota editada com sucesso!');
    }

    updateLoadingFinanceNotes(false);

    onCancelDetailNoteUpdate();
  };

  return mounted && selectedFinanceNote
    ? createPortal(
        <div className="fixed left-0 top-0 z-999999 flex size-full min-h-screen items-center justify-center bg-black/90 p-2">
          <div className="w-full max-w-142.5 rounded-lg bg-white px-2 py-4 text-center dark:bg-boxdark md:px-5 md:py-7">
            <span className="mx-auto inline-block">
              <MdOutlineEventNote size={48} className="font-bold text-meta-5" />
            </span>
            <h3 className="mb-10 text-xl font-bold text-black dark:text-white sm:text-2xl">
              Editar nota
            </h3>
            {/* Form */}
            <form
              onSubmit={handleSubmit(updateFinanceNoteHandler)}
              className="flex flex-col">
              {/* Type */}
              <div className="mb-4.5 flex w-full flex-col">
                <label className="mb-2.5 block self-start text-black dark:text-white">
                  Tipo <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register('type')}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="" disabled>
                      Selecione o tipo
                    </option>
                    <option value="D">Débito</option>
                    <option value="C">Crédito</option>
                  </select>
                  <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                    <SelectChevroletLogo size={24} />
                  </span>
                </div>
                <>
                  {errors.type && (
                    <span className="text-xs text-meta-1 dark:text-meta-7">
                      {errors.type.message}
                    </span>
                  )}
                </>
              </div>

              {/* Value */}
              <div className="mb-4.5 flex w-full flex-col">
                <label className="mb-2.5 block self-start text-black dark:text-white">
                  Valor <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Digite o valor"
                  {...register('value')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <>
                  {errors.value && (
                    <span className="text-xs text-meta-1 dark:text-meta-7">
                      {errors.value.message}
                    </span>
                  )}
                </>
              </div>

              {/* Description */}
              <div className="mb-4.5 flex w-full flex-col">
                <label className="mb-2.5 block self-start text-black dark:text-white">
                  Descrição <span className="text-meta-1">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Digite a descrição"
                  {...register('description')}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <>
                  {errors.description && (
                    <span className="text-xs text-meta-1 dark:text-meta-7">
                      {errors.description.message}
                    </span>
                  )}
                </>
              </div>

              <div className="mt-5 w-auto">
                <button
                  type="submit"
                  className="block w-full rounded border border-meta-3 bg-meta-3 p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body as Element
      )
    : null;
};

export default FinanceNoteUpdateModal;
