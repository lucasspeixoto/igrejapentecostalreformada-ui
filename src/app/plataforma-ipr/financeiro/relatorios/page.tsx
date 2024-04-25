import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import MonthInputsAndOutputs from './components/MonthInputsAndOutputs';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Relatórios',
};

const Reports = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Relatórios" />

      <MonthInputsAndOutputs />
    </div>
  );
};

export default Reports;
