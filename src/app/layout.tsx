import './globals.css';
import './data-tables-css.css';
import './satoshi.css';

import React from 'react';

import { AuthContextProvider } from '@/providers/AuthContextProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <div className="w-full dark:bg-boxdark-2 dark:text-bodydark">
          <main>
            <div className="z-20 w-full overflow-auto">
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
