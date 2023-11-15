'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import ChartOne from '@/components/Charts/ChartOne';
import ChartThree from '@/components/Charts/ChartThree';
import ChartTwo from '@/components/Charts/ChartTwo';
import ChatCard from '@/components/Chat/ChatCard';
import MapOne from '@/components/Maps/MapOne';
import { getUsersDocuments } from '@/lib/firebase/firestore/getData';
import { useAuthUserDataContext } from '@/providers/AuthUserDataContextProvider';
import type { UserData } from '@/types/user-data';

import StatisticTotals from '../Totals';

const StatisticsContainer: React.FC = () => {
  const userContext = useAuthUserDataContext();

  const [userLoadedData, setUserLoadedData] = React.useState<UserData[]>([]);

  const [isLoadingUsers, setIsLoadingUsers] = React.useState(true);

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    let mounted = true;

    const isAdmin = userContext.authData?.isAdmin!;

    setIsAdminOption(isAdmin);

    (async () => {
      const { userData } = await getUsersDocuments();

      if (isAdmin === false) {
        router.push('/membros/perfil');
      }

      if (userData && mounted) {
        setUserLoadedData(userData);
        setIsLoadingUsers(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userContext]);

  return (
    <>
      {isAdminOption === true ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <StatisticTotals />
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ChartOne />
            <ChartTwo />
            <ChartThree />
            <MapOne />

            <ChatCard />
          </div>
        </>
      ) : null}
    </>
  );
};

export default StatisticsContainer;
