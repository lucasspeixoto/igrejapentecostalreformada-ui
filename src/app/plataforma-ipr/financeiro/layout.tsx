import React from 'react';

import { FinanceNotesContextProvider } from './providers/FinanceNotesProvider';

const FinanceiroLayout = ({ children }: { children: React.ReactNode }) => {
  return <FinanceNotesContextProvider>{children}</FinanceNotesContextProvider>;
};

export default FinanceiroLayout;
