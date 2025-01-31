import './styles.scss';

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

  const currentBalance = React.useMemo(() => {
    if (financeReport) {
      return +financeReport.totalBalance;
    }
    return 0;
  }, [financeReport]);

  const newBalance = React.useMemo(
    () => currentBalance + totalMonthBalance,
    [totalMonthBalance, currentBalance]
  );

  return (
    <div className="container">
      <div className="container__item">
        <p className="container__item-value">
          Caixa anterior:
          {isLoadingFinanceReports || isLoadingFinanceNotes ? null : (
            <span
              className={`ml-2 mt-1 text-lg font-bold ${currentBalance >= 0 ? 'text-meta-3' : 'text-meta-7'}`}>
              R$ {currentBalance}
            </span>
          )}
        </p>
      </div>

      <div className="container__item">
        <p className="container__item-value">
          Saldo Mês:
          {isLoadingFinanceReports || isLoadingFinanceNotes ? null : (
            <span
              className={`ml-2 mt-1 text-lg font-bold ${
                totalMonthBalance >= 0 ? 'text-meta-3' : 'text-meta-7'
              }`}>
              R$ {totalMonthBalance}
            </span>
          )}
        </p>
      </div>

      <div className="container__item">
        <p className="container__item-value">
          Balanço mês:
          {isLoadingFinanceReports || isLoadingFinanceNotes ? null : (
            <span
              className={`ml-2 mt-1 text-lg font-bold ${newBalance >= 0 ? 'text-meta-3' : 'text-meta-7'}`}>
              R$ {newBalance}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TableHeaderInfo;
