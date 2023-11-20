import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import MembersList from '@/components/Tables/MembersList';

export const metadata: Metadata = {
  title: 'Lista de irmãos',
  description: 'Página com a listagem de irmãos',
};

const MembersListPage = () => {
  return (
    <>
      <Breadcrumb pageName="Lista de irmãos" />

      <div className="flex flex-col gap-10">
        <MembersList />
      </div>
    </>
  );
};

export default MembersListPage;
