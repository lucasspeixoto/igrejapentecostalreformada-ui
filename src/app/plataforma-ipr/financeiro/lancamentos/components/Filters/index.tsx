'use client';

/* eslint-disable max-len */
import useFinanceNotes from '@financeiro/lancamentos/store/useFinanceNotes';
import { generateDatesArray } from '@financeiro/lancamentos/utils/generate-dates-array';
import { useFinanceNotesContext } from '@financeiro/providers/FinanceNotesProvider';
import React from 'react';

import { SelectChevroletLogo } from '@/components/common/Icons';

const Filters: React.FC = () => {
  const setReferenceMonth = useFinanceNotes(state => state.setReferenceMonth);

  const selectedFinanceDetailDate = useFinanceNotes(
    state => state.referenceMonth
  );

  const { updateIsDataUpdatedInfo } = useFinanceNotesContext();

  const optionalDates = React.useMemo(() => {
    const dates = generateDatesArray(2020, 12);
    return dates;
  }, []);

  const onChangeSelectedDate = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReferenceMonth(event.target.value);

    updateIsDataUpdatedInfo();
  };

  return (
    <div className="relative z-20 w-auto max-w-[120px] bg-transparent dark:bg-form-input">
      <select
        value={selectedFinanceDetailDate}
        onChange={onChangeSelectedDate}
        className="relative z-20 w-full cursor-pointer appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
        <option disabled>Referência....</option>
        {React.Children.toArray(
          optionalDates.map(date => <option value={date}>{date}</option>)
        )}
      </select>
      <span className="absolute right-1 top-1/2 z-20 -translate-y-1/2">
        <SelectChevroletLogo size={24} />
      </span>
    </div>
  );
};

export default Filters;
