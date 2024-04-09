'use client';

/* eslint-disable max-len */
import React from 'react';

import { SelectChevroletLogo } from '@/components/common/Icons';

import useFinanceDetailDate from '../../store/useFinanceDetailDate';
import { generateDatesArray } from '../../utils/generate-dates-array';

const Filters: React.FC = () => {
  const setSelectedFinanceDetailDate = useFinanceDetailDate(
    state => state.setSelectedFinanceDetailDate
  );

  const selectedFinanceDetailDate = useFinanceDetailDate(
    state => state.selectedFinanceDetailDate
  );

  const optionalDates = React.useMemo(() => {
    const dates = generateDatesArray(2020, 12);
    return dates;
  }, []);

  const onChangeSelectedDate = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFinanceDetailDate(event.target.value);
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
