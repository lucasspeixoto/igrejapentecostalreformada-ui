'use client';

/* eslint-disable max-len */
import useFinance from '@financeiro/store/useFinance';
import { useFinanceNotesContext } from '@lancamentos/providers/FinanceNotesProvider';
import { generateMonthAndYearList } from '@lancamentos/utils/generate-dates-array';
import React from 'react';

import { SelectChevroletLogo } from '@/components/common/Icons';

const MonthAndYearFilter: React.FC = () => {
  const setNotesListReferenceMonth = useFinance(state => state.setNotesListReferenceMonth);

  const selectedFinanceDetailDate = useFinance(state => state.notesListReferenceMonth);

  const { updateIsDataUpdatedInfo } = useFinanceNotesContext();

  const optionalDates = React.useMemo(() => {
    const dates = generateMonthAndYearList(2024, 12);
    return dates;
  }, []);

  const onChangeSelectedDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNotesListReferenceMonth(event.target.value);

    updateIsDataUpdatedInfo();
  };

  return (
    <div className="relative z-20 w-auto max-w-[120px] bg-transparent dark:bg-form-input">
      <select
        value={selectedFinanceDetailDate}
        onChange={onChangeSelectedDate}
        className="relative z-20 w-full cursor-pointer appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
        <option disabled>Referência...</option>
        {React.Children.toArray(optionalDates.map(date => <option value={date}>{date}</option>))}
      </select>
      <span className="absolute right-1 top-1/2 z-20 -translate-y-1/2">
        <SelectChevroletLogo size={24} />
      </span>
    </div>
  );
};

export default MonthAndYearFilter;
