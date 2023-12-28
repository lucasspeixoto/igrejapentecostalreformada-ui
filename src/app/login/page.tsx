/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import AuthPagePresentation from '@appC/AuthPagePresentation';
import type { Metadata } from 'next';
import React from 'react';

import LoginWrapper from './components/LoginWrapper';

export const metadata: Metadata = {
  title: 'Login | IPR',
  description: 'Plataforma de membros da igreja pentecostal reformada (IPR)',
};

const SignIn: React.FC = () => {
  return (
    <React.Fragment>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="md-p-8 lg:md-p-8 flex flex-wrap items-center justify-center p-0">
          <AuthPagePresentation />

          <div className="w-full border-stroke md:w-1/2 md:border-l-2 dark:border-strokedark">
            <div className="flex h-screen w-full flex-col items-center justify-center px-4 md:px-0">
              <div className="w-full md:w-9/12 lg:w-8/12">
                <h2 className="mb-3 text-2xl font-bold text-black sm:text-title-xl2 dark:text-white">
                  Login
                </h2>

                <LoginWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
