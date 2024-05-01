/* eslint-disable max-len */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import { zodResolver } from '@hookform/resolvers/zod';
import { financeParameters } from '@lancamentos/constants/form-parameters';
import { MEMBERS } from '@lancamentos/constants/members-list';
import { getFinanceNote } from '@lancamentos/lib/firebase/get-finance-notes';
import updateFinanceNote from '@lancamentos/lib/firebase/update-finance-note';
import { useFinanceNotesContext } from '@lancamentos/providers/FinanceNotesProvider';
import type { UpdateFinanceNoteFormData } from '@lancamentos/schemas/update-finance-note-schema';
import { updateFinanceNoteFormSchema } from '@lancamentos/schemas/update-finance-note-schema';
import type { FinanceNote } from '@lancamentos/types/finance-note';
import updateFinanceReportsTotalBalance from '@relatorios/lib/firebase/update-finance-reports';
import { useFinanceReportsContext } from '@relatorios/providers/FinanceReportsProvider';
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
  const { financeNoteCategories, financePaymentVoucherOptions } = financeParameters;

  const { updateLoadingFinanceNotes, updateIsDataUpdatedInfo } = useFinanceNotesContext();

  const financeReportsContext = useFinanceReportsContext();

  const [isMounted, setIsMounted] = React.useState(false);

  const [actualFinanceNote, setActualFinanceNote] = React.useState<FinanceNote | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateFinanceNoteFormData>({
    resolver: zodResolver(updateFinanceNoteFormSchema),
  });

  React.useEffect(() => setIsMounted(true), []);

  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== 'Escape') return;

      onCancelDetailNoteUpdate();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  React.useEffect(() => {
    let mounted = true;

    const fetchFinanceNotes = async () => {
      const result = await getFinanceNote(noteId);

      const { financeNote } = result;

      setActualFinanceNote(financeNote);

      if (mounted && financeNote) {
        const { type, value, description, category, member, paymentVoucher } = financeNote;

        reset({ type, value, description, category, member, paymentVoucher });
      }
    };

    fetchFinanceNotes();

    return () => {
      mounted = false;
    };
  }, []);

  const updateActualNoteFromTotalBalance = async () => {
    const { type: actualType, value: actualValue } = actualFinanceNote!;

    const valueToUpdateBalance = actualType === 'C' ? -actualValue : actualValue;

    await updateFinanceReportsTotalBalance(valueToUpdateBalance);
  };

  const computeNewTotalBalance = async (type: 'C' | 'D', value: number) => {
    financeReportsContext.updateLoadingFinanceReports(true);

    await updateActualNoteFromTotalBalance();

    const valueToUpdateBalance = type === 'C' ? value : -value;

    await updateFinanceReportsTotalBalance(valueToUpdateBalance);

    financeReportsContext.updateFinanceReportsInfo();
  };

  const updateFinanceNoteHandler = async (formData: UpdateFinanceNoteFormData) => {
    updateLoadingFinanceNotes(true);

    const { error: updateNoteError } = await updateFinanceNote(noteId, formData);

    if (updateNoteError) {
      toast.error('Error ao alterar nota Tente novamente mais tarde ou contate admin.');
    } else {
      updateIsDataUpdatedInfo();

      const { type, value } = formData;

      await computeNewTotalBalance(type, value);

      toast.success('Nota alterada com sucesso!');
    }

    updateLoadingFinanceNotes(false);

    onCancelDetailNoteUpdate();
  };

  return isMounted
    ? createPortal(
        <div className="fixed left-0 top-0 z-999999 flex size-full min-h-screen items-center justify-center bg-black/90 p-2">
          <div className="max-h-full w-full max-w-142.5 overflow-y-auto rounded-lg bg-white p-4 text-center dark:bg-boxdark">
            <div className="mb-2 flex flex-col gap-2">
              <div className="mb-2 flex flex-row items-end justify-start gap-2 text-center">
                <span className="inline-block">
                  <MdOutlineEventNote size={48} className="font-bold text-meta-5" />
                </span>
                <div className="flex flex-col items-start justify-start">
                  <h3 className="text-lg font-bold text-black dark:text-white">Editar nota</h3>
                  <p className="text-md word-break self-start text-start">Altere aqui a nota selecionada.</p>
                </div>
              </div>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit(updateFinanceNoteHandler)} className="flex flex-col">
              <div className="mb-4 flex flex-col gap-2 md:flex-row">
                {/* Type */}
                <div className="flex w-full flex-col self-start md:w-1/2">
                  <label
                    htmlFor="type"
                    data-testid="type"
                    className="mb-2.5 block self-start text-black dark:text-white">
                    Tipo <span className="font-semibold text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      id="type"
                      aria-label="type"
                      role="type-select"
                      {...register('type')}
                      className="strokedark relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary">
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
                </div>

                {/* Value */}
                <div className="flex w-full flex-col self-start md:w-1/2">
                  <label
                    htmlFor="value"
                    data-testid="value"
                    className="mb-2.5 block self-start text-black dark:text-white">
                    Valor <span className="font-semibold text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="value"
                    aria-label="value"
                    placeholder="Digite o valor"
                    {...register('value')}
                    className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
                  />
                  <>
                    {errors.value && (
                      <span
                        role="alert"
                        data-testid="value-error"
                        className="text-xs font-semibold text-meta-1 dark:text-meta-7">
                        {errors.value.message}
                      </span>
                    )}
                  </>
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-2 md:flex-row">
                {/* Category */}
                <div className="flex w-full flex-col self-start md:w-1/2">
                  <label
                    htmlFor="category"
                    data-testid="category"
                    className="mb-2.5 block self-start text-black dark:text-white">
                    Categoria <span className="font-semibold text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      id="category"
                      aria-label="category"
                      role="category-select"
                      {...register('category')}
                      className="strokedark relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary">
                      <option value="" disabled>
                        Selecione a categoria
                      </option>
                      {React.Children.toArray(
                        financeNoteCategories.map(note => <option value={note}>{note}</option>)
                      )}
                    </select>
                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <SelectChevroletLogo size={24} />
                    </span>
                  </div>
                </div>

                {/* Comprovante */}
                <div className="flex w-full flex-col self-start md:w-1/2">
                  <label
                    htmlFor="paymentVoucher"
                    data-testid="paymentVoucher"
                    className="mb-2.5 block self-start text-black dark:text-white">
                    Comprovante <span className="font-semibold text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      id="paymentVoucher"
                      aria-label="paymentVoucher"
                      role="paymentVoucher-select"
                      {...register('paymentVoucher')}
                      className="strokedark relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary">
                      <option value="" disabled>
                        Selecione o status
                      </option>
                      {React.Children.toArray(
                        financePaymentVoucherOptions.map(note => <option value={note}>{note}</option>)
                      )}
                    </select>
                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <SelectChevroletLogo size={24} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Membro associado */}
              <div className="mb-4 flex w-full flex-col">
                <label
                  htmlFor="member"
                  data-testid="member"
                  className="mb-2.5 block self-start text-black dark:text-white">
                  Membro associado
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    id="member"
                    aria-label="member"
                    role="member-select"
                    {...register('member')}
                    className="strokedark relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary">
                    <option value="" disabled>
                      Selecione o membro
                    </option>
                    <option value="">Nenhum</option>
                    {React.Children.toArray(MEMBERS.map(member => <option value={member}>{member}</option>))}
                  </select>
                  <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                    <SelectChevroletLogo size={24} />
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 flex w-full flex-col">
                <label
                  htmlFor="description"
                  data-testid="description"
                  className="mb-2.5 block self-start text-black dark:text-white">
                  Descrição <span className="font-semibold text-meta-1">*</span>
                </label>
                <textarea
                  id="description"
                  aria-label="description"
                  rows={2}
                  placeholder="Digite a descrição"
                  {...register('description')}
                  className="strokedark w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-strokedark dark:bg-form-input dark:text-[#ccc] dark:focus:border-primary"
                />
                <>
                  {errors.description && (
                    <span
                      role="alert"
                      data-testid="description-error"
                      className="text-xs font-semibold text-meta-1 dark:text-meta-7">
                      {errors.description.message}
                    </span>
                  )}
                </>
              </div>

              {/* Actions */}
              <div className="flex w-full flex-wrap justify-evenly gap-4">
                <button
                  data-testid="cancel-button"
                  type="button"
                  onClick={() => onCancelDetailNoteUpdate()}
                  className="block w-auto min-w-[100px] rounded border border-meta-7 bg-meta-7 p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                  Cancelar
                </button>
                <button
                  data-testid="update-button"
                  type="submit"
                  className="block w-auto min-w-[100px] rounded border border-meta-3 bg-meta-3 p-3 text-center font-medium text-white transition hover:bg-opacity-90">
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
