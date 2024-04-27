import { useFinanceNotesContext } from '@lancamentos/providers/FinanceNotesProvider';
import { getMonthBalance } from '@lancamentos/utils/get-balance';
import { useFinanceReportsContext } from '@relatorios/providers/FinanceReportsProvider';
import React from 'react';

const TableHeaderInfo: React.FC = () => {
  const { financeNotes, isLoadingFinanceNotes } = useFinanceNotesContext();

  const { financeReport, isLoadingFinanceReports } = useFinanceReportsContext();

  const totalMonthBalance = React.useMemo(() => {
    return +getMonthBalance(financeNotes).toFixed(2);
  }, [financeNotes]);

  const totalBalance = React.useMemo(() => {
    if (financeReport) {
      return +financeReport.totalBalance;
    }
    return 0;
  }, [financeReport]);

  return (
    <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
      <>
        {financeNotes.length > 0 ? (
          <>
            <div className="mb-2 flex flex-col justify-start gap-1">
              <p className="text-xl font-semibold text-black dark:text-white">
                Saldo Mês:
                {isLoadingFinanceNotes ? null : (
                  <span
                    className={`ml-2 mt-1 text-lg font-bold ${
                      totalMonthBalance >= 0 ? 'text-meta-3' : 'text-meta-7'
                    }`}>
                    R$ {totalMonthBalance}
                  </span>
                )}
              </p>
            </div>
          </>
        ) : null}
      </>

      <>
        <div className="mb-2 flex flex-col justify-start gap-1">
          <p className="text-xl font-semibold text-black dark:text-white">
            Caixa
            {isLoadingFinanceReports || isLoadingFinanceNotes ? null : (
              <span
                className={`ml-2 mt-1 text-lg font-bold ${
                  totalBalance >= 0 ? 'text-meta-3' : 'text-meta-7'
                }`}>
                R$ {totalBalance}
              </span>
            )}
          </p>
        </div>
      </>
    </div>
  );
};

export default TableHeaderInfo;
