import React from 'react';

const COLUMNS = ['Autor', 'Inclusão', 'Tipo', 'Categoria', 'Valor (R$)', ''];

const FinanceTableColumns: React.FC = () => {
  return (
    <thead>
      <tr className="bg-gray-2 text-left dark:bg-meta-4">
        {React.Children.toArray(
          COLUMNS.map(column => {
            return <th className="w-auto p-4 font-medium text-black dark:text-white">{column}</th>;
          })
        )}
      </tr>
    </thead>
  );
};

export default FinanceTableColumns;
