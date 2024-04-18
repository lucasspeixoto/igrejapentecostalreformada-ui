import useFinanceNotes from '@financeiro/lancamentos/store/useFinanceNotes';
import { getBalance } from '@financeiro/lancamentos/utils/get-balance';
import { useFinanceNotesContext } from '@financeiro/providers/FinanceNotesProvider';
import React from 'react';

const TableHeaderInfo: React.FC = () => {
  const referenceMonth = useFinanceNotes(state => state.referenceMonth);

  const { financeNotes, isLoadingFinanceNotes } = useFinanceNotesContext();

  const totalBalance = React.useMemo(() => {
    return +getBalance(financeNotes).toFixed(2);
  }, [financeNotes]);

  return (
    <div className="flex w-full justify-between">
      <div className="mb-2 flex flex-col justify-start gap-1">
        <p className="text-xl font-semibold text-black dark:text-white">
          Notas Lançadas{' '}
          <span className="ml-2 mt-1 text-lg font-bold text-meta-3">
            {referenceMonth}
          </span>
        </p>
      </div>
      <div className="mb-2 flex flex-col justify-start gap-1">
        <p className="text-xl font-semibold text-black dark:text-white">
          Saldo Mês:
          {isLoadingFinanceNotes ? null : (
            <span
              className={`ml-2 mt-1 text-lg font-bold ${
                totalBalance >= 0 ? 'text-meta-5' : 'text-meta-7'
              }`}>
              R$ {totalBalance}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TableHeaderInfo;
