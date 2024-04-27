'use client';

import { getFinanceReportsDocuments } from '@relatorios/lib/firebase/get-finance-reports';
import type { FinanceReport } from '@relatorios/types/finance-report';
import React from 'react';

const initialValues = {
  financeReport: null,
  isLoadingFinanceReports: false,
  updateLoadingFinanceReports: () => {},
  updateIsDataUpdatedInfo: () => {},
};

type FinanceReportsContextType = {
  financeReport: FinanceReport | null;
  isLoadingFinanceReports: boolean;
  updateLoadingFinanceReports: (isLoading: boolean) => void;
  updateIsDataUpdatedInfo: () => void;
};

export const FinanceReportsContext =
  React.createContext<FinanceReportsContextType>(initialValues);

export const useFinanceReportsContext = () =>
  React.useContext(FinanceReportsContext);

export const FinanceReportsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [financeReport, setFinanceReport] =
    React.useState<FinanceReport | null>(null);

  const [isDataUpdated, setIsDataUpdated] = React.useState(false);

  const [isLoadingFinanceReports, setIsLoadingFinanceReports] =
    React.useState(false);

  const updateLoadingFinanceReports = (isLoading: boolean) => {
    setIsLoadingFinanceReports(isLoading);
  };

  const updateIsDataUpdatedInfo = () => {
    setIsDataUpdated(state => !state);
  };

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

    updateLoadingFinanceReports(false);
  }, [isDataUpdated]);

  return (
    <FinanceReportsContext.Provider
      value={{
        financeReport,
        isLoadingFinanceReports,
        updateLoadingFinanceReports,
        updateIsDataUpdatedInfo,
      }}>
      {children}
    </FinanceReportsContext.Provider>
  );
};
