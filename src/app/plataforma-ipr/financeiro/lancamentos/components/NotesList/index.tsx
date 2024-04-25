/* eslint-disable max-len */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable prettier/prettier */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import EmptyDataPage from '@/app/components/EmptyDataPage';
import Loader from '@/components/common/Loader';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useAuthContext } from '@/providers/AuthContextProvider';

import { useFinanceNotesContext } from '../../../providers/FinanceNotesProvider';
import FinanceDesktopView from './components/FinanceDesktopView';
import FinanceMobileView from './components/FinanceMobileView';
import TableHeaderInfo from './components/TableHeaderInfo';

const MAX_MOBILE_WIDTH = 768;

const NotesList: React.FC = () => {
  const userContext = useAuthContext();

  const { financeNotes, isLoadingFinanceNotes } = useFinanceNotesContext();

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const router = useRouter();

  const isMobileSize = useWindowDimensions(MAX_MOBILE_WIDTH);

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
        <div className="">
          <TableHeaderInfo />

          <div className="pb-10">
            {isLoadingFinanceNotes ? (
              <Loader />
            ) : (
              <>
                {financeNotes.length > 0 ? (
                  <>
                    {isMobileSize ? (
                      <FinanceMobileView />
                      
                    ) : (
                      <FinanceDesktopView />
                    )}
                  </>
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
