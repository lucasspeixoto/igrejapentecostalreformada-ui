import './css/globals.css';
import './css/data-tables-css.css';
import './css/satoshi.css';

import React from 'react';

import { FirebaseAuthContextProvider } from '@/providers/FirebaseAuthContextProvider';
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
              <FirebaseAuthContextProvider>
                <ToastProvider>{children}</ToastProvider>
              </FirebaseAuthContextProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
