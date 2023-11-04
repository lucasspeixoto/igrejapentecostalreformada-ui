import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import EducationForm from './EducationForm';
import FamilyForm from './FamilyForm';

export const metadata: Metadata = {
  title: 'Dados Complementares',
  description: 'Cadastro de dados complementares',
  // other metadata
};

const SupplementaryForm = () => {
  return (
    <>
      <Breadcrumb pageName="Dados Complementares" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- FamilyForm Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Família
              </h3>
            </div>
            <div className="p-6.5">
              <FamilyForm />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Education Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Educação
              </h3>
            </div>
            <div className="p-6.5">
              <EducationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplementaryForm;
