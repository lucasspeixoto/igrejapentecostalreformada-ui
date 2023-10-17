'use client';

import './globals.css';
import './data-tables-css.css';
import './satoshi.css';

import { useEffect, useState } from 'react';

import Loader from '@/components/common/Loader';
import { AuthContextProvider } from '@/providers/AuthContextProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="w-full dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <main>
              <div className="w-full overflow-auto">
                <AuthContextProvider>
                  <ToastProvider>{children}</ToastProvider>
                </AuthContextProvider>
              </div>
            </main>
          )}
        </div>
      </body>
    </html>
  );
}
