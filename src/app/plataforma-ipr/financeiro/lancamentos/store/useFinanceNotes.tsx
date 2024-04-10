import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getActualDate } from '../utils/get-actual-date';

type FinanceNotesStore = {
  referenceMonth: string; //! Ex: 04/2024
  setReferenceMonth: (referenceMonth: string) => void;
};

const useFinanceNotes = create(
  persist<FinanceNotesStore>(
    set => ({
      referenceMonth: getActualDate(),
      setReferenceMonth: (referenceMonth: string) =>
        set(() => ({ referenceMonth })),
    }),
    {
      name: 'finance-notes-storage',
    }
  )
);

export default useFinanceNotes;
