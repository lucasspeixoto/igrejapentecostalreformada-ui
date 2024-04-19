/* eslint-disable max-len */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */

import { zodResolver } from '@hookform/resolvers/zod';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineEventNote } from 'react-icons/md';

import { SelectChevroletLogo } from '@/components/common/Icons';
import { useAuthContext } from '@/providers/AuthContextProvider';

import { financeParameters } from '../../../constants/form-parameters';
import type { InsertFinanceNoteFormData } from '../../../schemas/insert-finance-note-schema';
import { insertFinanceNoteFormSchema } from '../../../schemas/insert-finance-note-schema';
import type { FinanceNote } from '../../../types/finance-note';

type FinanceNoteInsertProps = {
  onCancel: () => void;
  insertNoteHandler: (financeNote: Partial<FinanceNote>) => void;
};

const FinanceNoteInsert: React.FC<FinanceNoteInsertProps> = ({
  onCancel,
  insertNoteHandler,
}) => {
  const { financeNoteCategories } = financeParameters;

  const { authData } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InsertFinanceNoteFormData>({
    resolver: zodResolver(insertFinanceNoteFormSchema),
  });

  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== 'Escape') return;

      onCancel();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  const insertNewNoteHandler = async (formData: InsertFinanceNoteFormData) => {
    const { description, type, value, category } = formData;

    const newFinanceNote: Partial<FinanceNote> = {
      photoUrl: authData?.photoUrl,
      owner: authData?.name,
      date: Timestamp.fromDate(new Date()),
      description,
      type,
      value,
      category,
    };

    insertNoteHandler(newFinanceNote);

    reset();
  };

  return (
    <div className="fixed left-0 top-0 z-999999 flex size-full max-h-full min-h-screen items-center justify-center bg-black/90 p-2">
      <div className="max-h-full w-full max-w-142.5 overflow-y-auto rounded-lg bg-white p-4 text-center dark:bg-boxdark">
        <div className="mb-5 flex flex-col gap-2">
          <span className="mx-auto inline-block">
            <MdOutlineEventNote size={48} className="font-bold text-meta-5" />
          </span>
          <h3 className="text-xl font-bold text-black dark:text-white sm:text-2xl">
            Nova nota
          </h3>
          <p className="self-start text-start">
            Preencha todos os campos para adicionar nova nota financeira.
          </p>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit(insertNewNoteHandler)}
          className="flex flex-col">
          {/* Type */}
          <div className="mb-4.5 flex w-full flex-col">
            <label className="mb-2.5 block self-start text-black dark:text-white">
              Tipo <span className="text-meta-1">*</span>
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                {...register('type')}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 font-medium text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
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

          {/* Category */}
          <div className="mb-4.5 flex w-full flex-col">
            <label className="mb-2.5 block self-start text-black dark:text-white">
              Categoria <span className="text-meta-1">*</span>
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                {...register('category')}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 font-medium text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <option value="" disabled>
                  Selecione a categoria
                </option>
                {React.Children.toArray(
                  financeNoteCategories.map(note => (
                    <option value={note}>{note}</option>
                  ))
                )}
              </select>
              <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                <SelectChevroletLogo size={24} />
              </span>
            </div>
          </div>

          {/* Value */}
          <div className="mb-4.5 flex w-full flex-col items-start">
            <label className="mb-2.5 block self-start text-black dark:text-white">
              Valor <span className="text-meta-1">*</span>
            </label>
            <input
              type="number"
              placeholder="Digite o valor"
              {...register('value')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
          <div className="mb-4.5 flex w-full flex-col items-start">
            <label className="mb-2.5 block self-start text-black dark:text-white">
              Descrição <span className="text-meta-1">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Digite a descrição"
              {...register('description')}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinanceNoteInsert;
