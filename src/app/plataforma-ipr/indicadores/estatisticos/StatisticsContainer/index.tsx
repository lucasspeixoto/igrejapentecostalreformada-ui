'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { getUsersDocuments } from '@/lib/firebase/firestore/getData';
import { useAuthContext } from '@/providers/AuthContextProvider';
import type { UserData } from '@/types/user-data';

import CityDistribuitionChart from '../CityDistribuitionChart';
import ManAndWomanChart from '../ManAndWomanChart';
import StatisticTotals from '../Totals';

const StatisticsContainer: React.FC = () => {
  const userAuthContext = useAuthContext();

  const [userLoadedData, setUserLoadedData] = React.useState<UserData[]>([]);

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    let mounted = true;

    const isAdmin = userAuthContext.authData?.isAdmin!;

    setIsAdminOption(isAdmin);

    (async () => {
      const { userData } = await getUsersDocuments();

      if (isAdmin === false) {
        router.push('/plataforma-ipr/perfil');
      }

      if (userData && mounted) {
        setUserLoadedData(userData);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userAuthContext]);

  return (
    <>
      {isAdminOption === true ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <StatisticTotals userData={userLoadedData} />
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ManAndWomanChart userData={userLoadedData} />

            <CityDistribuitionChart userData={userLoadedData} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default StatisticsContainer;
