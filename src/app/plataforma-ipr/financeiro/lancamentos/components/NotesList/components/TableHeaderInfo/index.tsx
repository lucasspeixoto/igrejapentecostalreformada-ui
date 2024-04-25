import { useFinanceNotesContext } from '@financeiro/providers/FinanceNotesProvider';
import useFinanceNotes from '@lancamentos/store/useFinanceNotes';
import { getBalance } from '@lancamentos/utils/get-balance';
import React from 'react';

const TableHeaderInfo: React.FC = () => {
  const referenceMonth = useFinanceNotes(state => state.referenceMonth);

  const { financeNotes, isLoadingFinanceNotes } = useFinanceNotesContext();

  const totalBalance = React.useMemo(() => {
    return +getBalance(financeNotes).toFixed(2);
  }, [financeNotes]);

  return (
    <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
      <div className="mb-2 flex flex-col justify-start gap-1">
        <p className="text-xl font-semibold text-black dark:text-white">
          Notas Lançadas{' '}
          <span className="ml-2 mt-1 text-lg font-bold text-primary">
            {referenceMonth}
          </span>
        </p>
      </div>
      {financeNotes.length > 0 ? (
        <>
          <div className="mb-2 flex flex-col justify-start gap-1">
            <p className="text-xl font-semibold text-black dark:text-white">
              Saldo Mês:
              {isLoadingFinanceNotes ? null : (
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
      ) : null}
    </div>
  );
};

export default TableHeaderInfo;
