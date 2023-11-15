'use client';

import React from 'react';
import { FaWpforms } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoManOutline } from 'react-icons/io5';
import { RiAdminLine } from 'react-icons/ri';

import CardDataStats from '@/components/CardDataStats';
import type { UserData } from '@/types/user-data';

const StatisticTotals: React.FC<{ userData: UserData[] }> = ({ userData }) => {
  const authData = React.useMemo(
    () => userData.map(user => user.auth),
    [userData]
  );

  const processData = React.useMemo(
    () => userData.map(user => user.process),
    [userData]
  );

  const totalOfMembers = userData.length;

  const isRegisteredTotal = React.useMemo(() => {
    return processData.reduce(
      (element, process) => (process?.isRegistered ? element + 1 : element),
      0
    );
  }, [userData]);

  const isAdminTotal = React.useMemo(() => {
    return authData.reduce(
      (element, auth) => (auth.isAdmin ? element + 1 : element),
      0
    );
  }, [userData]);

  const isNormalMember = React.useMemo(() => {
    return authData.reduce(
      (element, personal) =>
        personal?.role === 'Irmão(ã)' ? element + 1 : element,
      0
    );
  }, [userData]);

  return (
    <>
      <CardDataStats
        title="Membros"
        total={totalOfMembers.toString()}
        rate="100%"
        levelUp>
        <HiOutlineUsers
          size={22}
          className="font-bold text-primary dark:text-white"
        />
      </CardDataStats>
      <CardDataStats
        title="Completo"
        total={isRegisteredTotal.toString()}
        rate={`${((isRegisteredTotal / totalOfMembers) * 100).toFixed(2)}%`}
        levelUp={isRegisteredTotal === totalOfMembers}
        levelDown={isRegisteredTotal !== totalOfMembers}>
        <FaWpforms
          size={22}
          className="font-bold text-primary dark:text-white"
        />
      </CardDataStats>

      <CardDataStats
        title="Adminstradores"
        total={isAdminTotal.toString()}
        rate={`${((isAdminTotal / totalOfMembers) * 100).toFixed(2)}%`}
        levelUp={isAdminTotal === totalOfMembers}
        levelDown={isAdminTotal !== totalOfMembers}>
        <RiAdminLine
          size={22}
          className="font-bold text-primary dark:text-white"
        />
      </CardDataStats>
      <CardDataStats
        title="Sem Função"
        total={isNormalMember.toString()}
        rate={`${((isNormalMember / totalOfMembers) * 100).toFixed(2)}%`}
        levelUp={isNormalMember === totalOfMembers}
        levelDown={isNormalMember !== totalOfMembers}>
        <IoManOutline
          size={22}
          className="font-bold text-primary dark:text-white"
        />
      </CardDataStats>
    </>
  );
};

export default StatisticTotals;
