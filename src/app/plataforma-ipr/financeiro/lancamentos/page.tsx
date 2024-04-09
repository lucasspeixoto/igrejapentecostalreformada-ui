import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import Filters from './components/Filters';
import FinanceActions from './components/FinanceActions';
import NotesList from './components/NotesList';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Lançamentos',
};

const ReleasesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Lançamentos" />

      <div className="flex flex-col gap-5 ">
        <div className="flex w-full justify-between">
          <Filters />
          <FinanceActions />
        </div>
        <NotesList />
      </div>
    </>
  );
};

export default ReleasesPage;
