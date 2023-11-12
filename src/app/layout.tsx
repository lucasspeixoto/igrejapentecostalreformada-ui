'use client';

import './globals.css';
import './data-tables-css.css';
import './satoshi.css';

import React from 'react';

import { AuthContextProvider } from '@/providers/AuthContextProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import useIsLoading from '@/store/useIsLoading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoadingStore = useIsLoading(state => state.isLoading);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="w-full dark:bg-boxdark-2 dark:text-bodydark">
          <main>
            <div className="w-full overflow-auto">
              <AuthContextProvider>
                <ToastProvider>{children}</ToastProvider>
              </AuthContextProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
