import { FinanceNotesContextProvider } from '@lancamentos/providers/FinanceNotesProvider';
import { FinanceReportsContextProvider } from '@relatorios/providers/FinanceReportsProvider';
import React from 'react';

const FinanceiroLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FinanceReportsContextProvider>
      <FinanceNotesContextProvider>{children}</FinanceNotesContextProvider>
    </FinanceReportsContextProvider>
  );
};

export default FinanceiroLayout;
