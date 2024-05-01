import React from 'react';

const COLUMNS = ['Membro', 'Atuação', 'Perfil', 'Cadastro', 'Ações'];

const MembersTableColumns: React.FC = () => {
  return (
    <thead>
      <tr className="bg-gray-2 text-left dark:bg-meta-4">
        {React.Children.toArray(
          COLUMNS.map(column => {
            return <th className="p-4 font-medium text-black dark:text-white xl:pl-11">{column}</th>;
          })
        )}
      </tr>
    </thead>
  );
};

export default MembersTableColumns;
