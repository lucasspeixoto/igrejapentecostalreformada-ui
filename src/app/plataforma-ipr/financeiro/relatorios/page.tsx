import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import InputsVersusOutputs from './components/InputsVersusOutputs';
import YearFilter from './components/YearFilter';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Relatórios',
};

const Reports = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Relatórios" />

      <div className="flex flex-col gap-5">
        <div className="flex w-full justify-between">
          <YearFilter />
        </div>

        <InputsVersusOutputs />
      </div>
    </div>
  );
};

export default Reports;
