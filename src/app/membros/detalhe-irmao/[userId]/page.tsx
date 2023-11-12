import type { Metadata } from 'next';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import MemberCard from '../../perfil/MemberCard';
import UserPhoto from '../../perfil/UserPhoto';
import UserBaseData from '../UserBaseData';

export const metadata: Metadata = {
  title: 'Detalhe Irmão',
  description: 'Página de detalhe de membro selecionado',
  // other metadata
};

const MemberDetailPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  return (
    <>
      <Breadcrumb pageName="Perfil Irmão" />

      <div className="mt-5 grid grid-cols-5 gap-8">
        <div className="sm-col-span-5 col-span-8 md:col-span-3">
          <UserBaseData userId={userId} />
        </div>
        <div className="col-span-8 md:col-span-2">
          <div className="flex w-full flex-col items-center justify-center md:items-start">
            <MemberCard />

            <UserPhoto />
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDetailPage;
