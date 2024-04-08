/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import BaptismForm from './components/BaptismForm';
import MemberForm from './components/MemberForm';

export const metadata: Metadata = {
  title: 'Dados Eclesiásticos',
  description: 'Cadastro de dados eclesiásticos',
};

const EcclesiasticForm = () => {
  return (
    <>
      <Breadcrumb pageName="Dados Eclesiásticos" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Membresia
              </h3>
            </div>
            {/* */}

            <div className="p-6.5">
              <MemberForm />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Address Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Batismo
              </h3>
            </div>
            <div className="p-6.5">
              <BaptismForm />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 mt-10 flex w-full justify-center">
        <Link
          href="/plataforma-ipr/cadastro/pessoal"
          className="cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-secondary bg-secondary p-2 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          Voltar
        </Link>
      </div>
    </>
  );
};

export default EcclesiasticForm;
