'use client';

/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable prettier/prettier */

import Loader from '@components/common/Loader';
import { getUsersDocuments } from '@fire/firestore/getData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';

import { useAuthContext } from '@/providers/AuthContextProvider';
import type { UserData } from '@/types/user-data';
import { orderMembersListByName } from '@/utils/array-operations';

import MemberDeleteAction from './components/MemberDeleteAction';
import MemberDetailAction from './components/MemberDetailAction';
import MembersTableColumns from './components/MembersTableColumns';
import MembersTableInfo from './components/MembersTableInfo';

const MembersList: React.FC = () => {
  const userContext = useAuthContext();

  const [userLoadedData, setUserLoadedData] = React.useState<UserData[]>([]);

  const [isLoadingUsers, setIsLoadingUsers] = React.useState(true);

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const router = useRouter();

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
              <>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                      <MembersTableColumns />
                      <tbody>
                        {React.Children.toArray(
                          userLoadedData?.sort(orderMembersListByName).map(member => (
                            <tr className="hover:bg-gray-2 hover:dark:bg-meta-4 hover:cursor-pointer">
                              <td className="border-b border-[#eee] px-0 py-5 pl-9 xl:pl-5 dark:border-strokedark">
                                <div className="flex flex-row items-center gap-4 font-medium text-black dark:text-white">
                                  <div className="shrink-0">
                                    <>
                                      {member.auth?.photoUrl ? (
                                        <Image
                                          src={member.auth?.photoUrl!}
                                          alt="Foto membro"
                                          width={32}
                                          height={32}
                                          className="size-10 rounded-full"
                                        />
                                      ) : (
                                        <Image
                                          src={'/images/user/dummy-user.png'}
                                          alt="Brand"
                                          width={32}
                                          height={32}
                                          className="size-10 rounded-full"
                                        />
                                      )}
                                    </>
                                  </div>
                                  <p className="hidden text-black sm:block dark:text-white">
                                    {member.auth?.name.split(' ')[0]}{' '}
                                  </p>
                                </div>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">{member?.auth?.role}</p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {member?.auth?.isAdmin ? 'Admin' : 'Membro'}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {member?.process?.isRegistered ? (
                                    <AiOutlineCheckCircle size={20} className="text-meta-3" />
                                  ) : (
                                    <BiBlock size={20} className="text-meta-7" />
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                  <MemberDetailAction userId={member?.auth.userId} />

                                  <MemberDeleteAction userId={member?.auth.userId} />
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default MembersList;
