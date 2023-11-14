'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineCheckCircle, AiOutlineEye } from 'react-icons/ai';
import { BiBlock, BiTrash } from 'react-icons/bi';

import { getUsersDocuments } from '@/lib/firebase/firestore/getData';
import { useAuthUserDataContext } from '@/providers/AuthUserDataContextProvider';
import type { UserData } from '@/types/user-data';

import Loader from '../common/Loader';

const MembersList: React.FC = () => {
  const userContext = useAuthUserDataContext();

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

  /**
   * The function `seeUserDetailHandler` navigates to a user detail page using the
   * provided user ID.
   * @param {string} userId - A string representing the unique identifier of a
   * user.
   */
  const seeUserDetailHandler = (userId: string) => {
    router.push(`detalhe-irmao/${userId}`);
  };

  const deleteUserHandler = (userId: string) => {
    // eslint-disable-next-line no-console
    console.log('delete', userId);
  };

  return (
    <>
      {isAdminOption ? (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Membros Cadastrados IPR
          </h4>

          <div className="pb-10">
            {isLoadingUsers || !userLoadedData.length ? (
              <Loader />
            ) : (
              <>
                <div className="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
                  <div className="max-w-full overflow-x-auto ">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="min-w-[220px] p-4 font-medium text-black dark:text-white xl:pl-11">
                            Nome
                          </th>
                          <th className="min-w-[150px] p-4 font-medium text-black dark:text-white">
                            Atuação
                          </th>
                          <th className="min-w-[120px] p-4 font-medium text-black dark:text-white">
                            Perfil
                          </th>
                          <th className="min-w-[120px] p-4 font-medium text-black dark:text-white">
                            Cadastro
                          </th>
                          <th className="p-4 font-medium text-black dark:text-white">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {React.Children.toArray(
                          userLoadedData?.map(member => (
                            <tr>
                              <td className="border-b border-[#eee] px-1 py-5 pl-9 dark:border-strokedark xl:pl-5">
                                <div className="flex flex-row items-center gap-4 font-medium text-black dark:text-white">
                                  <div className="shrink-0">
                                    <>
                                      {member.auth?.photoUrl ? (
                                        <Image
                                          src={member.auth?.photoUrl!}
                                          alt="Foto membro"
                                          width={48}
                                          height={48}
                                          className="rounded-full"
                                        />
                                      ) : (
                                        <Image
                                          src={'/images/user/dummy-user.png'}
                                          alt="Brand"
                                          width={48}
                                          height={48}
                                          className="rounded-full"
                                        />
                                      )}
                                    </>
                                  </div>
                                  <p className="hidden text-black dark:text-white sm:block">
                                    {member.auth?.name.split(' ')[0]}{' '}
                                  </p>
                                </div>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {member?.auth?.role}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {member?.auth?.isAdmin ? 'Admin' : 'Membro'}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {member?.process?.isRegistered ? (
                                    <AiOutlineCheckCircle
                                      size={20}
                                      className="text-meta-3"
                                    />
                                  ) : (
                                    <BiBlock
                                      size={20}
                                      className="text-meta-7"
                                    />
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                  <button className="hover:text-meta-5">
                                    <AiOutlineEye
                                      size={20}
                                      onClick={() =>
                                        seeUserDetailHandler(
                                          member?.auth.userId
                                        )
                                      }
                                    />
                                  </button>
                                  <button
                                    className="hover:text-meta-7"
                                    onClick={() =>
                                      deleteUserHandler(member?.auth.userId)
                                    }>
                                    <BiTrash size={20} />
                                  </button>
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
        </div>
      ) : null}
    </>
  );
};

export default MembersList;
