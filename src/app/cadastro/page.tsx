/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import AuthPagePresentation from '@appC/AuthPagePresentation';
import type { Metadata } from 'next';
import React from 'react';

import RedirectLink from '../components/RedirectLink';
import SignUpForm from './SignUpForm';

export const metadata: Metadata = {
  title: 'Cadastro | Igreja Pentecostal reformada',
  description: 'Plataforma de membros da igreja pentecostal reformada (IPR)',
};

const SignUp: React.FC = () => {
  return (
    <React.Fragment>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="md-p-8 lg:md-p-8 flex flex-wrap items-center justify-center p-0">
          <AuthPagePresentation />

          <div className="w-full border-stroke dark:border-strokedark md:w-1/2 md:border-l-2">
            <div className="flex h-screen w-full flex-col items-center justify-center px-4 md:px-0">
              <div className="w-full md:w-9/12 lg:w-8/12">
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Cadastro
                </h2>

                <SignUpForm />

                <div className="mt-2 text-center">
                  <RedirectLink
                    text="Ja possui uma conta?"
                    textLink="Logar"
                    route="/login"
                  />
                </div>

                <div className="mt-2 text-center">
                  <RedirectLink
                    text="Acesse a "
                    textLink="Bíblia IPR"
                    route="https://ipr-biblia.vercel.app/"
                    target="blank"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
