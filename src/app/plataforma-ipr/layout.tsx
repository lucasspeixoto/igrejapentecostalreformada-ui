/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React from 'react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { AuthContextProvider } from '@/providers/AuthContextProvider';

const MembrosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <AuthContextProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />

            {/* className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" */}
            <main>{children}</main>
          </div>
        </div>
      </AuthContextProvider>
    </div>
  );
};

export default MembrosLayout;
