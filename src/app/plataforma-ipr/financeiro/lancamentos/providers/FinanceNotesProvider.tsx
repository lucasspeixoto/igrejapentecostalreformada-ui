'use client';

import { getFinanceNotesDocumentsByMonthAndYear } from '@lancamentos/lib/firebase/get-finance-notes';
import type { FinanceNote } from '@lancamentos/types/finance-note';
import React from 'react';

import useFinanceNotes from '@/app/plataforma-ipr/financeiro/store/useFinance';

import { orderNotesByDate } from '../utils/order-notes-by-date';

const initialValues = {
  financeNotes: [],
  isLoadingFinanceNotes: false,
  updateLoadingFinanceNotes: () => {},
  updateIsDataUpdatedInfo: () => {},
};

type FinanceNotesContextType = {
  financeNotes: FinanceNote[];
  isLoadingFinanceNotes: boolean;
  updateLoadingFinanceNotes: (isLoading: boolean) => void;
  updateIsDataUpdatedInfo: () => void;
};

export const FinanceNotesContext = React.createContext<FinanceNotesContextType>(initialValues);

export const useFinanceNotesContext = () => React.useContext(FinanceNotesContext);

export const FinanceNotesContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [financeNotes, setFinanceNotes] = React.useState<FinanceNote[]>([]);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const [isLoadingFinanceNotes, setIsLoadingFinanceNotes] = React.useState(false);

  const selectedFinanceDetailDate = useFinanceNotes(state => state.notesListReferenceMonth);

  const updateLoadingFinanceNotes = (isLoading: boolean) => {
    setIsLoadingFinanceNotes(isLoading);
  };

  const updateIsDataUpdatedInfo = () => {
    setIsDataUpdated(state => !state);
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
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });

    updateLoadingFinanceNotes(false);
  }, [isDataUpdated]);

  return (
    <FinanceNotesContext.Provider
      value={{
        financeNotes,
        isLoadingFinanceNotes,
        updateLoadingFinanceNotes,
        updateIsDataUpdatedInfo,
      }}>
      {children}
    </FinanceNotesContext.Provider>
  );
};
