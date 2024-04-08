import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Relatórios',
};

const Reports = () => {
  return (
    <>
      <Breadcrumb pageName="Relatórios" />
    </>
  );
};

export default Reports;
