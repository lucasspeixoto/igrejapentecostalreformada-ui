/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import type { Metadata } from 'next';
import React from 'react';

import { AppInfo } from './components/AppInfo';
import { AppLogo } from './components/AppLogo';
import { AppWelcomePresentation } from './components/AppWelcomePresentation';
import LoginWrapper from './components/LoginWrapper';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Plataforma de membros da igreja pentecostal reformada (IPR)',
};

const SignIn: React.FC = () => {
  return (
    <div className="m-[1rem] flex h-[calc(100vh-2rem)] flex-col justify-between bg-white">
      {/* Top Side */}
      <div className="hidden lg:block">
        <AppLogo />
      </div>

      {/* Bottom Side */}
      <div className="flex h-[100%] items-center justify-center gap-5 lg:min-h-[90%]">
        {/* Presentation */}
        <AppWelcomePresentation />

        {/* Login */}
        <div className="w-[500px] max-w-[98%] lg:max-w-[50%]">
          <div className="block lg:hidden">
            <AppLogo />
          </div>

          <h2 className="my-4 flex w-full items-center justify-center text-xl font-bold leading-10 tracking-tight text-black md:mb-10 2xl:text-2xl dark:text-white">
            Login
          </h2>

          <LoginWrapper />

          <AppInfo />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
