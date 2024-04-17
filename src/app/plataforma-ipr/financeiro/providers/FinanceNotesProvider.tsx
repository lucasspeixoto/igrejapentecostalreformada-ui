'use client';

import React, { createContext, useContext, useState } from 'react';

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
  createContext<FinanceNotesContextType>(initialValues);

export const useFinanceNotesContext = () => useContext(FinanceNotesContext);

export const FinanceNotesContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [financeNotes, setFinanceNotes] = useState<FinanceNote[]>([]);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const [isLoadingFinanceNotes, setIsLoadingFinanceNotes] = useState(false);

  const updateLoadingFinanceNotes = (isLoading: boolean) => {
    setIsLoadingFinanceNotes(isLoading);
  };

  const updateIsDataUpdatedInfo = () => {
    setIsDataUpdated(true);
  };

  React.useEffect(() => {
    const financeNotesData = getFinanceNotesDocuments();

    financeNotesData
      .then(data => {
        if (data) {
          setFinanceNotes(data?.financeNotesData);
        } else {
          setFinanceNotes([]);
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
