import type { Metadata } from 'next';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import UserContainer from '../components/UserContainer';

export const metadata: Metadata = {
  title: 'Detalhe Irmão',
  description: 'Página de detalhe de membro selecionado',
};

const MemberDetailPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  return (
    <div className='className="mx-auto 2xl:p-10" max-w-screen-2xl p-4 md:p-6'>
      <Breadcrumb pageName="Perfil Irmão" />

      <UserContainer userId={userId} />
    </div>
  );
};

export default MemberDetailPage;
