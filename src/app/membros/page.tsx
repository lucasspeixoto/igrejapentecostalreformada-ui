import type { Metadata } from 'next';

import ECommerce from '@/components/Dashboard/E-commerce';

export const metadata: Metadata = {
  title: 'Igreja Pentecostal reformada',
  description: 'Cadastro',
  // other metadata
};

export default function Membros() {
  return (
    <>
      <ECommerce />
    </>
  );
}
