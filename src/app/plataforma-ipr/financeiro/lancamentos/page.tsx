import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import FinanceActions from './components/FinanceActions';
import MonthAndYearFilter from './components/MonthAndYearFilter';
import NotesList from './components/NotesList';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Lançamentos',
};

const ReleasesPage = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Lançamentos" />

      <div className="flex flex-col gap-5">
        <div className="flex w-full justify-between">
          <MonthAndYearFilter />
          <FinanceActions />
        </div>

        <NotesList />
      </div>
    </div>
  );
};

export default ReleasesPage;
