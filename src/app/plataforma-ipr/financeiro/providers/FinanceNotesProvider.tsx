'use client';

import React from 'react';

import { getFinanceNotesDocuments } from '../lancamentos/lib/firebase/get-finance-notes';
import type { FinanceNote } from '../lancamentos/types/finance-note';

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

  const updateLoadingFinanceNotes = (isLoading: boolean) => {
    setIsLoadingFinanceNotes(isLoading);
  };

  const updateIsDataUpdatedInfo = () => {
    setIsDataUpdated(state => !state);
  };

  React.useEffect(() => {
    const financeNotesData = getFinanceNotesDocuments();

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
