import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getActualDate } from '../utils/get-actual-date';

type RangeFilterStore = {
  selectedFinanceDetailDate: string;
  setSelectedFinanceDetailDate: (selectedFinanceDetailDate: string) => void;
};

const useFinanceDetailDate = create(
  persist<RangeFilterStore>(
    set => ({
      selectedFinanceDetailDate: getActualDate(),
      setSelectedFinanceDetailDate: (selectedFinanceDetailDate: string) =>
        set(() => ({ selectedFinanceDetailDate })),
    }),
    {
      name: 'range-filter-storage',
    }
  )
);

export default useFinanceDetailDate;
