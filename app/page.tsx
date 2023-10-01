import type { Metadata } from 'next';

import ECommerce from '@/components/Dashboard/E-commerce';

export const metadata: Metadata = {
  title: 'Plataforma Igreja Pentecostal reformada',
  description: 'Página Inicial',
  // other metadata
};

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  );
}
