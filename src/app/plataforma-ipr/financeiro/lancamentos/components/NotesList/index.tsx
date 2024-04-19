/* eslint-disable max-len */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable prettier/prettier */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import EmptyDataPage from '@/app/components/EmptyDataPage';
import Loader from '@/components/common/Loader';
import { useAuthContext } from '@/providers/AuthContextProvider';

import { useFinanceNotesContext } from '../../../providers/FinanceNotesProvider';
import FinanceTable from './components/FinanceTable';
import TableHeaderInfo from './components/TableHeaderInfo';

const NotesList: React.FC = () => {
  const userContext = useAuthContext();

  const { financeNotes, isLoadingFinanceNotes } = useFinanceNotesContext();

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const isAdmin = userContext.authData?.isAdmin!;

    setIsAdminOption(isAdmin);

    if (isAdmin === false) {
      router.push('/plataforma-ipr/perfil');
    }
  }, [userContext]);

  return (
    <>
      {isAdminOption ? (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
          <TableHeaderInfo />

          <div className="pb-10">
            {isLoadingFinanceNotes ? (
              <Loader />
            ) : (
              <>
                {financeNotes.length > 0 ? (
                  <FinanceTable />
                ) : (
                  <EmptyDataPage description="Não há nenhuma nota lançada para o período selecionado!" />
                )}
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NotesList;
