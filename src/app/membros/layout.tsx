'use client';

/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React, { useState } from 'react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useAuthContext } from '@/providers/AuthContextProvider';
import { AuthUserDataContextProvider } from '@/providers/AuthUserDataContextProvider';
import { EcclesiasticalContextProvider } from '@/providers/register/EcclesiasticalContextProvider';
import { PersonalContextProvider } from '@/providers/register/PersonalContextProvider';
import { SupplementaryContextProvider } from '@/providers/register/SupplementaryContextProvider';

type MembrosLayoutProps = {
  children: React.ReactNode;
};

const MembrosLayout = ({ children }: MembrosLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const useAuth = useAuthContext()!;

  return (
    <>
      {useAuth.isAuthenticated ? (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <AuthUserDataContextProvider>
            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Sidebar Start ===== --> */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <PersonalContextProvider>
                      <SupplementaryContextProvider>
                        <EcclesiasticalContextProvider>
                          {children}
                        </EcclesiasticalContextProvider>
                      </SupplementaryContextProvider>
                    </PersonalContextProvider>
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
          </AuthUserDataContextProvider>
        </div>
      ) : null}
    </>
  );
};

export default MembrosLayout;
