import type { Metadata } from 'next';

import SignIn from './login/page';

export const metadata: Metadata = {
  title: 'Plataforma Igreja Pentecostal reformada',
  description: 'Página Inicial',
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}
