import './styles.scss';

import React from 'react';

type MonthBalanceProps = {
  inputs: number;
  outputs: number;
  totalMonthBalance: number;
  currentBalance: number;
  newBalance: number;
};
const MonthBalance: React.FC<MonthBalanceProps> = ({
  inputs,
  outputs,
  totalMonthBalance,
  currentBalance,
  newBalance,
}) => {
  return (
    <div>
      <div className="main">
        {/* Caixa */}
        <div className="main__month">
          <h3 className="item-heading">Caixa</h3>
          <p className="item">
            Entradas:
            <span className="ml-2 mt-1 text-lg font-bold text-meta-3">R$ {inputs}</span>
          </p>

          <p className="item">
            Saídas:
            <span className="ml-2 mt-1 text-lg font-bold text-meta-7">R$ {outputs}</span>
          </p>

          <p className="item">
            Saldo mês:
            <span
              className={`ml-2 mt-1 text-lg font-bold ${totalMonthBalance >= 0 ? 'text-meta-3' : 'text-meta-7'}`}>
              R$ {totalMonthBalance.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="main__divider"></div>

        {/* Balanço */}
        <div className="main__balance">
          <h3 className="item-heading">Balanço</h3>
          <p className="item">
            Caixa anterior:
            <span className="ml-2 mt-1 text-lg font-bold text-meta-3 underline decoration-from-font opacity-90">
              R$ {currentBalance}
            </span>
          </p>

          <p className="item">
            Novo caixa:
            <span className="ml-2 mt-1 text-lg font-bold text-meta-3 underline decoration-from-font opacity-90">
              R$ {newBalance}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthBalance;
