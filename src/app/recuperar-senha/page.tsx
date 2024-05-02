/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import AuthPagePresentation from '@appC/AuthPagePresentation';
import type { Metadata } from 'next';
import React from 'react';

import RedirectLink from '../components/RedirectLink';
import RecoveryPasswordForm from './components/RecoveryPasswordForm';

export const metadata: Metadata = {
  title: 'Recuperar Senha',
  description: 'Plataforma de membros da igreja pentecostal reformada (IPR)',
};

const RecoveryPassword: React.FC = () => {
  return (
    <div className="flex h-full flex-col justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  md:h-[calc(100vh-0rem)]">
      <div className="flex h-full items-center justify-center gap-5 lg:min-h-[90%]">
        <AuthPagePresentation />

        <div className="w-[500px] max-w-[98%] lg:max-w-[50%]">
          <h2 className="mt-4 flex w-full items-center justify-center text-xl font-bold leading-10 tracking-tight text-black dark:text-white md:mb-4 2xl:text-2xl">
            Login
          </h2>

          <RecoveryPasswordForm />

          <div className="mt-4 text-center">
            <RedirectLink text="Ja possui uma conta?" textLink="Logar" route="/login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPassword;
