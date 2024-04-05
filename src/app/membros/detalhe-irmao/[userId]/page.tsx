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
    <>
      <Breadcrumb pageName="Perfil Irmão" />

      <UserContainer userId={userId} />
    </>
  );
};

export default MemberDetailPage;
