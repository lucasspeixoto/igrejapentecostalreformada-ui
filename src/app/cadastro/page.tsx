/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import type { Metadata } from 'next';
import React from 'react';

import AuthPagePresentation from '../components/AuthPagePresentation';
import RedirectLink from '../components/RedirectLink';
import SignUpForm from './components/SignUpForm';

export const metadata: Metadata = {
  title: 'Cadastrar',
  description: 'Plataforma de membros da igreja pentecostal reformada (IPR)',
};

const SignUp: React.FC = () => {
  return (
    <div className="flex h-full flex-col justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-full items-center justify-center gap-5 lg:min-h-[90%]">
        <AuthPagePresentation />

        <div className="flex h-screen w-[500px] max-w-[98%] flex-col justify-center lg:max-w-[50%]">
          <h2 className="mt-4 flex w-full items-center justify-center text-xl font-bold leading-10 tracking-tight text-black dark:text-white md:mb-4 2xl:text-2xl">
            Cadastro
          </h2>

          <SignUpForm />

          <div className="mt-4 text-center">
            <RedirectLink text="Ja possui uma conta?" textLink="Logar" route="/login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
