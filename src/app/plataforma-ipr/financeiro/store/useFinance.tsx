import { getActualDate, getActualYear } from '@lancamentos/utils/get-actual-date';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FinanceStore = {
  notesListReferenceMonth: string; //! Ex: 04/2024
  setNotesListReferenceMonth: (notesListReferenceMonth: string) => void;
  reportsReferenceYear: number;
  setReportsReferenceYear: (reportsReferenceYear: number) => void;
};

const useFinance = create(
  persist<FinanceStore>(
    set => ({
      notesListReferenceMonth: getActualDate(),
      setNotesListReferenceMonth: (notesListReferenceMonth: string) =>
        set(() => ({ notesListReferenceMonth })),
      reportsReferenceYear: getActualYear(),
      setReportsReferenceYear: (reportsReferenceYear: number) => set(() => ({ reportsReferenceYear })),
    }),
    {
      name: 'finance-notes-storage',
    }
  )
);

export default useFinance;
