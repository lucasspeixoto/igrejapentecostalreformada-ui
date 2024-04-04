import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import Releases from './components/Releases';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Lançamentos',
};

const ReleasesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Lançamentos" />

      <div className="flex flex-col gap-10">
        <Releases />
      </div>
    </>
  );
};

export default ReleasesPage;
