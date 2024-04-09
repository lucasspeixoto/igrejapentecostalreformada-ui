/* eslint-disable max-len */

'use client';

import React from 'react';

const FinanceActions: React.FC = () => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="max-w-[80px] cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        Novo
      </button>
      <button
        type="button"
        className="max-w-[80px] cursor-pointer rounded-lg border border-meta-8 bg-meta-8 p-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        Auditoria
      </button>
    </div>
  );
};

export default FinanceActions;
