/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import AuthPagePresentation from '@appC/AuthPagePresentation';
import type { Metadata } from 'next';
import React from 'react';

import RedirectLink from '../components/RedirectLink';
import LoginActions from './LoginActions';

export const metadata: Metadata = {
  title: 'Login | Igreja Pentecostal reformada',
  description: 'Plataforma de membros da igreja pentecostal reformada (IPR)',
};

const SignIn: React.FC = () => {
  return (
    <React.Fragment>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="md-p-8 lg:md-p-8 flex flex-wrap items-center justify-center p-0">
          <AuthPagePresentation />

          <div className="w-full border-stroke dark:border-strokedark md:w-1/2 md:border-l-2">
            <div className="flex h-screen w-full flex-col justify-center p-4 sm:p-12.5 md:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Login
              </h2>

              <LoginActions />

              {/* Footer com redirecionamentos */}
              <div className="mt-6 text-center">
                <RedirectLink
                  text="Não possui conta ?"
                  textLink="Cadastrar"
                  route="/cadastro"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
