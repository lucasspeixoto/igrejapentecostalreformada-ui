'use client';

import { getFinanceNotesDocuments } from '@lancamentos/lib/firebase/get-finance-notes';
import useFinanceNotes from '@lancamentos/store/useFinanceNotes';
import type { FinanceNote } from '@lancamentos/types/finance-note';
import React from 'react';

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

export const FinanceNotesContext =
  React.createContext<FinanceNotesContextType>(initialValues);

export const useFinanceNotesContext = () =>
  React.useContext(FinanceNotesContext);

export const FinanceNotesContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [financeNotes, setFinanceNotes] = React.useState<FinanceNote[]>([]);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const [isLoadingFinanceNotes, setIsLoadingFinanceNotes] =
    React.useState(false);

  const selectedFinanceDetailDate = useFinanceNotes(
    state => state.referenceMonth
  );

  const updateLoadingFinanceNotes = (isLoading: boolean) => {
    setIsLoadingFinanceNotes(isLoading);
  };

  const updateIsDataUpdatedInfo = () => {
    setIsDataUpdated(state => !state);
  };

  React.useEffect(() => {
    const month = +selectedFinanceDetailDate.split('/')[0];
    const year = +selectedFinanceDetailDate.split('/')[1];

    const financeNotesData = getFinanceNotesDocuments(month, year);

    financeNotesData
      .then(data => {
        if (data) {
          setFinanceNotes(data.financeNotesData);
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
