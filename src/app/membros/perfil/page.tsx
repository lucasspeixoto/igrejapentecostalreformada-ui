/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import MemberCard from './MemberCard';
import UserBio from './UserBio';
import UserPhoto from './UserPhoto';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Meu perfil na plataforma IPR',
};

const Profile = () => {
  return (
    <>
      <Breadcrumb pageName="Perfil" />

      <div className="mt-5 grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <UserBio />
        </div>
        <div className="col-span-3 xl:col-span-2">
          <MemberCard />

          <UserPhoto />
        </div>
      </div>
    </>
  );
};

export default Profile;
