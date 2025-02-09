/* eslint-disable max-len */

'use client';

import './styles.scss';

import useFinance from '@financeiro/store/useFinance';
import { useFinanceNotesContext } from '@lancamentos/providers/FinanceNotesProvider';
import { generateMonthAndYearList } from '@lancamentos/utils/generate-dates-array';
import React from 'react';

import { isDateGreaterThanCurrentMonth } from '@/app/plataforma-ipr/financeiro/lancamentos/utils/compare-dates';
import { SelectChevroletLogo } from '@/components/common/Icons';
import LoadingSelect from '@/components/EmptySelect';

import { useFinanceReportsContext } from '../../relatorios/providers/FinanceReportsProvider';

const MonthAndYearFilter: React.FC = () => {
  const setNotesListReferenceMonth = useFinance(state => state.setNotesListReferenceMonth);

  const selectedFinanceDetailDate = useFinance(state => state.notesListReferenceMonth);

  const { updateIsDataUpdatedInfo } = useFinanceNotesContext();

  const { financeReport, isLoadingFinanceReports } = useFinanceReportsContext();

  const optionalDates = React.useMemo(() => {
    const dates = generateMonthAndYearList(2024, 12);
    return dates;
  }, []);

  const onChangeSelectedDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNotesListReferenceMonth(event.target.value);

    updateIsDataUpdatedInfo();
  };

  return (
    <div className="select-box">
      {isLoadingFinanceReports ? (
        <LoadingSelect text="Aguarde ..." />
      ) : (
        <>
          <select value={selectedFinanceDetailDate} onChange={onChangeSelectedDate}>
            <option disabled>Referência...</option>
            {React.Children.toArray(
              optionalDates.map(date => (
                <option
                  disabled={isDateGreaterThanCurrentMonth(date, financeReport?.currentMonth!)}
                  value={date}>
                  {date}
                </option>
              ))
            )}
          </select>
          <span>
            <SelectChevroletLogo size={24} />
          </span>
        </>
      )}
    </div>
  );
};

export default MonthAndYearFilter;
