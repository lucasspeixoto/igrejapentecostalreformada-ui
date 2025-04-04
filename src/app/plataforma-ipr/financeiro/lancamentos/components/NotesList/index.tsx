'use client';

/* eslint-disable max-len */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable prettier/prettier */

import { useRouter } from 'next/navigation';
import React from 'react';

import EmptyDataPage from '@/app/components/EmptyDataPage';
import Loader from '@/components/common/Loader';
import useIsWindowWidthMatched from '@/hooks/useIsWindowWidthMatched';
import { useAuthContext } from '@/providers/AuthContextProvider';

import { useFinanceNotesContext } from '../../providers/FinanceNotesProvider';
import FinanceNotesCards from './components/FinanceNotesCards';
import FinanceNotesFilters from './components/FinanceNotesFilters';
import FinanceNotesTable from './components/FinanceNotesTable';
import TableHeaderInfo from './components/TableHeaderInfo';

const MAX_MOBILE_WIDTH = 768;

const NotesList: React.FC = () => {
  const userContext = useAuthContext();

  const { financeNotes, isLoadingFinanceNotes } = useFinanceNotesContext();

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const router = useRouter();

  const isMobileSize = useIsWindowWidthMatched(MAX_MOBILE_WIDTH);

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
        <>
          <TableHeaderInfo />

          <FinanceNotesFilters />

          <div className="pb-10">
            {isLoadingFinanceNotes ? (
              <Loader />
            ) : (
              <>
                {financeNotes.length > 0 ? (
                  <>{isMobileSize ? <FinanceNotesCards /> : <FinanceNotesTable />}</>
                ) : (
                  <EmptyDataPage description="Não há nenhuma nota lançada para o período selecionado!" />
                )}
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default NotesList;
