'use client';

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable prettier/prettier */

import Loader from '@components/common/Loader';
import { getUsersDocuments } from '@fire/firestore/getData';
import { useRouter } from 'next/navigation';
import React from 'react';

import useIsWindowWidthMatched from '@/hooks/useIsWindowWidthMatched';
import { useAuthContext } from '@/providers/AuthContextProvider';
import type { UserData } from '@/types/user-data';

import MembersDesktopView from './components/MembersDesktopView';
import MembersMobileView from './components/MembersMobileView';
import MembersTableInfo from './components/MembersTableInfo';

const MAX_MOBILE_WIDTH = 768;

const MembersList: React.FC = () => {
  const userContext = useAuthContext();

  const [userLoadedData, setUserLoadedData] = React.useState<UserData[]>([]);

  const [isLoadingUsers, setIsLoadingUsers] = React.useState(true);

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const router = useRouter();

  const isMobileSize = useIsWindowWidthMatched(MAX_MOBILE_WIDTH);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      const { userData } = await getUsersDocuments();

      const isAdmin = userContext.authData?.isAdmin!;

      setIsAdminOption(isAdmin);

      if (isAdmin === false) {
        router.push('/plataforma-ipr/perfil');
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
      {isAdminOption ? (
        <>
          <MembersTableInfo total={userLoadedData.length} />

          <div className="pb-10">
            {isLoadingUsers || !userLoadedData.length ? (
              <Loader />
            ) : (
              <>{isMobileSize ? <MembersMobileView members={userLoadedData} /> : <MembersDesktopView members={userLoadedData} />}</>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default MembersList;
