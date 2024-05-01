import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import MembersList from './components/MembersList';

export const metadata: Metadata = {
  title: 'Lista de irmãos',
  description: 'Página com a listagem de irmãos',
};

const MembersListPage = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Lista de irmãos" />

      <div className="flex flex-col gap-5">
        <MembersList />
      </div>
    </div>
  );
};

export default MembersListPage;
