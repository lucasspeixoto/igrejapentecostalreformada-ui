'use client';

import useFinanceNotes from '@financeiro/store/useFinance';
import { getFinanceNotesDocumentsByYear } from '@lancamentos/lib/firebase/get-finance-notes';
import { getFinanceReportsDocuments } from '@relatorios/lib/firebase/get-finance-reports';
import type { FinanceReport } from '@relatorios/types/finance-report';
import React from 'react';

import type { InputsVersusOutputsState } from '../types/inputs-versus-output-state';
import {
  computeInputsAndOutputsValuesInAYear,
  createInputsVersusOutputsState,
} from '../utils/inputs-and-outputs-computes';

type FinanceReportsContextType = {
  financeReport: FinanceReport | null;
  isLoadingFinanceReports: boolean;
  updateLoadingFinanceReports: (isLoading: boolean) => void;
  updateFinanceReportsInfo: () => void;

  inputsVersusOutputsState: InputsVersusOutputsState | null;
  isLoadingFinanceNotes: boolean;
  updateLoadingFinanceNotes: (isLoading: boolean) => void;
  updateFinanceNotesInfo: () => void;
};

const initialValues = {
  financeReport: null,
  isLoadingFinanceReports: false,
  updateLoadingFinanceReports: () => {},
  updateFinanceReportsInfo: () => {},

  inputsVersusOutputsState: null,
  isLoadingFinanceNotes: false,
  updateLoadingFinanceNotes: () => {},
  updateFinanceNotesInfo: () => {},
};

export const FinanceReportsContext = React.createContext<FinanceReportsContextType>(initialValues);

export const useFinanceReportsContext = () => React.useContext(FinanceReportsContext);

export const FinanceReportsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [financeReport, setFinanceReport] = React.useState<FinanceReport | null>(null);
  const [isFinanceReportDataUpdated, setIsFinanceReportDataUpdated] = React.useState(false);
  const [isLoadingFinanceReports, setIsLoadingFinanceReports] = React.useState(true);

  const [inputsVersusOutputsState, setInputsVersusOutputsState] =
    React.useState<InputsVersusOutputsState | null>(null);

  const [isFinanceNotesDataUpdated, setIsFinanceNotesDataUpdated] = React.useState(false);
  const [isLoadingFinanceNotes, setIsLoadingFinanceNotes] = React.useState(true);

  const selectedReportsReferenceYear = useFinanceNotes(state => state.reportsReferenceYear);

  const updateLoadingFinanceReports = (isLoading: boolean) => {
    setIsLoadingFinanceReports(isLoading);
  };

  const updateLoadingFinanceNotes = (isLoading: boolean) => {
    setIsLoadingFinanceNotes(isLoading);
  };

  const updateFinanceReportsInfo = () => {
    setIsFinanceReportDataUpdated(state => !state);
  };

  const updateFinanceNotesInfo = () => {
    setIsFinanceNotesDataUpdated(state => !state);
  };

  /* Finance Reports */
  React.useEffect(() => {
    const financeReportsData = getFinanceReportsDocuments();

    financeReportsData
      .then(data => {
        if (data) {
          const financeReportData = data.financeReportData as FinanceReport;
          setFinanceReport(financeReportData);
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });

    setTimeout(() => updateLoadingFinanceReports(false), 5000);
  }, [isFinanceReportDataUpdated]);

  /* Finance Notes */
  React.useEffect(() => {
    const year = +selectedReportsReferenceYear;

    const financeNotesData = getFinanceNotesDocumentsByYear(year);

    financeNotesData
      .then(data => {
        if (data) {
          const { inputs, outputs } = computeInputsAndOutputsValuesInAYear(data.financeNotesData);

          const series = createInputsVersusOutputsState(inputs, outputs);

          setInputsVersusOutputsState(series);
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });

    updateLoadingFinanceNotes(false);
  }, [isFinanceReportDataUpdated, isFinanceNotesDataUpdated]);

  return (
    <FinanceReportsContext.Provider
      value={{
        financeReport,
        isLoadingFinanceReports,
        updateLoadingFinanceReports,
        updateFinanceReportsInfo,
        inputsVersusOutputsState,
        isLoadingFinanceNotes,
        updateLoadingFinanceNotes,
        updateFinanceNotesInfo,
      }}>
      {children}
    </FinanceReportsContext.Provider>
  );
};
