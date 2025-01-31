import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import MonthAndYearFilter from '../components/MonthAndYearFilter';
import MonthBalanceCategoryChart from '../components/MonthBalanceCategoryChart';
import InputsAndOutputsByYear from './components/InputsAndOutputsByYear';
import YearFilter from './components/YearFilter';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Relatórios',
};

const Reports = () => {
  return (
    <div className="mx-auto max-w-screen-2xl gap-8 p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Relatórios" />

      <div className="mb-8 mt-2 flex w-full flex-col gap-3">
        <YearFilter />
        <InputsAndOutputsByYear />
      </div>

      <div className="mb-8 mt-2 flex w-full flex-col gap-3">
        <MonthAndYearFilter />
        <MonthBalanceCategoryChart />
      </div>
    </div>
  );
};

export default Reports;
