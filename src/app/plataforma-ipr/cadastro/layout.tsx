/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React from 'react';

import UserFormDataContextProviders from './providers/UserFormDataContextProviders';

const CadastroLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserFormDataContextProviders>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
    </UserFormDataContextProviders>
  );
};

export default CadastroLayout;
