/* eslint-disable max-len */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import './styles.scss';

import React from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineAudit } from 'react-icons/ai';

import MonthBalanceCategoryChart from '@/app/plataforma-ipr/financeiro/components/MonthBalanceCategoryChart';
import { useFinanceReportsContext } from '@/app/plataforma-ipr/financeiro/relatorios/providers/FinanceReportsProvider';
import useFinance from '@/app/plataforma-ipr/financeiro/store/useFinance';

import { useFinanceNotesContext } from '../../../providers/FinanceNotesProvider';
import { getMonthBalance, getMonthCreditOrDebitNotes } from '../../../utils/get-balance';
import MonthBalance from './components/MonthBalance';

type MonthlyAuditModalProps = {
  onCancelAudit: () => void;
  processMonthlyAuditHandler: () => void;
};

const MonthlyAuditModal: React.FC<MonthlyAuditModalProps> = ({
  onCancelAudit,
  processMonthlyAuditHandler,
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  const selectedFinanceDetailDate = useFinance(state => state.notesListReferenceMonth);

  const { financeReport } = useFinanceReportsContext();

  const { financeNotes } = useFinanceNotesContext();

  const inputs = React.useMemo(() => {
    return +getMonthCreditOrDebitNotes(financeNotes, 'C').toFixed(2);
  }, [financeNotes]);

  const outputs = React.useMemo(() => {
    return +getMonthCreditOrDebitNotes(financeNotes, 'D').toFixed(2);
  }, [financeNotes]);

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

  React.useEffect(() => setIsMounted(true), []);

  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== 'Escape') return;

      onCancelAudit();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  const processMonthlyAudit = () => {
    processMonthlyAuditHandler();
  };

  return isMounted
    ? createPortal(
        <div className="modal">
          <div className="modal__box">
            <div className="modal__box-content">
              <div className="mb-2 flex flex-row items-end justify-center gap-2 text-center md:justify-start">
                <span className="inline-block">
                  <AiOutlineAudit size={48} className="font-bold text-meta-5" />
                </span>
                <div className="flex flex-col items-start justify-start">
                  <h3 className="text-base font-bold text-black dark:text-white md:text-lg">
                    Fechamento {selectedFinanceDetailDate}
                  </h3>
                  <p className="md:text-md word-break self-start text-start text-base">
                    Verifique as pendências e realize o fechamento.
                  </p>
                </div>
              </div>

              <MonthBalance
                inputs={inputs}
                outputs={outputs}
                totalMonthBalance={totalMonthBalance}
                currentBalance={currentBalance}
                newBalance={newBalance}
              />

              <MonthBalanceCategoryChart />
            </div>

            {/* Actions */}
            <div className="modal__box-actions">
              <button
                data-testid="cancel-button"
                type="button"
                onClick={() => onCancelAudit()}
                className="block w-auto min-w-[100px] rounded border border-meta-7 bg-meta-7 p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                Cancelar
              </button>
              <button
                data-testid="update-button"
                type="button"
                onClick={() => processMonthlyAudit()}
                className="block w-auto min-w-[100px] rounded border border-meta-3 bg-meta-3 p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                Fechar mês
              </button>
            </div>
          </div>
        </div>,
        document.body as Element
      )
    : null;
};

export default MonthlyAuditModal;
