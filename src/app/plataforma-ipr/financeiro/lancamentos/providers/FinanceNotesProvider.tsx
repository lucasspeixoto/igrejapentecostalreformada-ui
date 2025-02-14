'use client';

import { getFinanceNotesDocumentsByMonthAndYear } from '@lancamentos/lib/firebase/get-finance-notes';
import type { FinanceNote } from '@lancamentos/types/finance-note';
import React from 'react';

import useFinanceNotes from '@/app/plataforma-ipr/financeiro/store/useFinance';
import { generateTimestampFromStringDate } from '@/utils/transform-date';

import { orderNotesByDate } from '../utils/order-notes-by-date';

const initialValues = {
  financeNotes: [],
  isLoadingFinanceNotes: false,
  totalValuesByCategory: {},
  updateLoadingFinanceNotes: () => {},
  updateIsDataUpdatedInfo: () => {},
  filterFinanceNotes: () => {},
};

type FinanceNotesContextType = {
  financeNotes: FinanceNote[];
  isLoadingFinanceNotes: boolean;
  totalValuesByCategory: Record<string, number>;
  updateLoadingFinanceNotes: (isLoading: boolean) => void;
  updateIsDataUpdatedInfo: () => void;
  filterFinanceNotes: (category: string, date: string, value: string) => void;
};

export const FinanceNotesContext = React.createContext<FinanceNotesContextType>(initialValues);

export const useFinanceNotesContext = () => React.useContext(FinanceNotesContext);

export const FinanceNotesContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [financeNotes, setFinanceNotes] = React.useState<FinanceNote[]>([]);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const [isLoadingFinanceNotes, setIsLoadingFinanceNotes] = React.useState(true);

  const [totalValuesByCategory, setTotalValuesByCategory] = React.useState<Record<string, number>>({});

  const selectedFinanceDetailDate = useFinanceNotes(state => state.notesListReferenceMonth);

  const updateLoadingFinanceNotes = (isLoading: boolean) => {
    setIsLoadingFinanceNotes(isLoading);
  };

  const updateIsDataUpdatedInfo = () => {
    setIsDataUpdated(state => !state);
  };

  const computeTotalValuesByCategory = (notes: FinanceNote[]) => {
    const computedTotalValuesByCategory = notes
      .filter(note => note.category !== 'Prebenda' && note.type === 'D')
      .reduce(
        (acc, note) => {
          const { category } = note;
          const value = parseFloat(note.value.toFixed(2));
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += value;
          return acc;
        },
        {} as Record<string, number>
      );

    setTotalValuesByCategory(computedTotalValuesByCategory);
  };

  const filterFinanceNotes = (category: string, date: string, value: string): void => {
    updateLoadingFinanceNotes(true);

    const month = +selectedFinanceDetailDate.split('/')[0];
    const year = +selectedFinanceDetailDate.split('/')[1];

    const financeNotesByMonthAndYear = getFinanceNotesDocumentsByMonthAndYear(month, year);

    financeNotesByMonthAndYear
      .then(data => {
        if (data) {
          let filteredNotes =
            category !== 'all'
              ? data.financeNotesData.filter(note => note.category === category)
              : data.financeNotesData;

          if (date !== '') {
            const formatedDate = generateTimestampFromStringDate(date);

            filteredNotes = filteredNotes.filter(note => note.date.toMillis() === formatedDate.toMillis());
          }

          if (value !== '') {
            filteredNotes = filteredNotes.filter(note => note.value === Number(value));
          }

          setFinanceNotes(filteredNotes);
          computeTotalValuesByCategory(filteredNotes);
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });

    setTimeout(() => updateLoadingFinanceNotes(false), 1000);
  };

  React.useEffect(() => {
    const month = +selectedFinanceDetailDate.split('/')[0];
    const year = +selectedFinanceDetailDate.split('/')[1];

    const financeNotesData = getFinanceNotesDocumentsByMonthAndYear(month, year);

    financeNotesData
      .then(data => {
        if (data) {
          const sortedNotes = orderNotesByDate(data.financeNotesData);
          setFinanceNotes(sortedNotes);
          computeTotalValuesByCategory(sortedNotes);
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });

    setTimeout(() => updateLoadingFinanceNotes(false), 1000);
  }, [isDataUpdated]);

  return (
    <FinanceNotesContext.Provider
      value={{
        financeNotes,
        isLoadingFinanceNotes,
        totalValuesByCategory,
        updateLoadingFinanceNotes,
        updateIsDataUpdatedInfo,
        filterFinanceNotes,
      }}>
      {children}
    </FinanceNotesContext.Provider>
  );
};
