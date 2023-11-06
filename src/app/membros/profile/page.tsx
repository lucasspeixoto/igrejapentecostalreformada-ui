/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import type { Metadata } from 'next';
import Image from 'next/image';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import UserDetail from './UserDetail';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Meu perfil na plataforma IPR',
};

const Profile = () => {
  return (
    <>
      <Breadcrumb pageName="Perfil" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={'/images/cover/cover-01.png'}
            alt="profile cover"
            className="h-full w-full rounded-t-sm object-cover object-center"
            width={970}
            height={260}
          />
          {/* <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4">
              <input type="file" name="cover" id="cover" className="sr-only" />
              <FiCamera size={16} />
              <span>Editar</span>
            </label>
          </div> */}
        </div>

        {/* Dados de Perfil */}
        <UserDetail />
      </div>
    </>
  );
};

export default Profile;
