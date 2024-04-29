'use client';

/* eslint-disable max-len */
import useFinance from '@financeiro/store/useFinance';
import { generateYearList } from '@lancamentos/utils/generate-dates-array';
import React from 'react';

import { SelectChevroletLogo } from '@/components/common/Icons';

const YearFilter: React.FC = () => {
  const setReportsReferenceYear = useFinance(state => state.setReportsReferenceYear);

  const reportsReferenceYear = useFinance(state => state.reportsReferenceYear);

  const years = React.useMemo(() => {
    return generateYearList(2020);
  }, []);

  const onChangeSelectedDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReportsReferenceYear(+event.target.value);
  };

  return (
    <div className="relative z-20 w-auto max-w-[120px] bg-transparent dark:bg-form-input">
      <select
        value={reportsReferenceYear}
        onChange={onChangeSelectedDate}
        className="relative z-20 w-full cursor-pointer appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
        <option disabled>Ano....</option>
        {React.Children.toArray(years.map(year => <option value={year}>{year}</option>))}
      </select>
      <span className="absolute right-1 top-1/2 z-20 -translate-y-1/2">
        <SelectChevroletLogo size={24} />
      </span>
    </div>
  );
};

export default YearFilter;
