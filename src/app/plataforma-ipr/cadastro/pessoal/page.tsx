import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import AddressForm from './components/AddressForm';
import ContactForm from './components/ContactForm';
import DocsForm from './components/DocsForm';

export const metadata: Metadata = {
  title: 'Dados Pessoais',
  description: 'Cadastro de dados pessoais',
};

const PersonalForm = () => {
  return (
    <>
      <Breadcrumb pageName="Dados Pessoais" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contato
              </h3>
            </div>

            <div className="p-6.5">
              <ContactForm />
            </div>
          </div>

          {/* <!-- Documentos --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Documentos
              </h3>
            </div>
            <div className="p-6.5">
              <DocsForm />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Address Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Endereço
              </h3>
            </div>
            <div className="p-6.5">
              <AddressForm />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 mt-10 flex w-full justify-center">
        <Link
          href="/plataforma-ipr/cadastro/complementar"
          className="cursor-pointer items-center justify-center gap-3.5 rounded-lg border border-secondary bg-secondary p-2 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          Continuar
        </Link>
      </div>
    </>
  );
};

export default PersonalForm;
