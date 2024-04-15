/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React from 'react';

import UserFormDataContextProviders from './providers/UserFormDataContextProviders';

const CadastroLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserFormDataContextProviders>
      <div className="m-8 p-6">{children}</div>
    </UserFormDataContextProviders>
  );
};

export default CadastroLayout;
