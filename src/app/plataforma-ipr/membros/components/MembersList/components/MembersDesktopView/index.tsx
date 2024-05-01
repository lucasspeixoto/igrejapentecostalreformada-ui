import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';

import Image from '@/components/Image';
import type { UserData } from '@/types/user-data';
import { orderMembersListByName } from '@/utils/array-operations';

import MemberDeleteAction from '../MemberDeleteAction';
import MemberDetailAction from '../MemberDetailAction';
import MembersTableColumns from '../MembersTableColumns';

type MembersDesktopViewProps = {
  members: UserData[];
};

const MembersDesktopView: React.FC<MembersDesktopViewProps> = ({ members }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <MembersTableColumns />
          <tbody>
            {React.Children.toArray(
              members?.sort(orderMembersListByName).map(member => (
                <tr className="hover:cursor-pointer hover:bg-gray-2 hover:dark:bg-meta-4">
                  <td className="border-b border-[#eee] px-0 py-5 pl-9 dark:border-strokedark xl:pl-5">
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
                      <p className="hidden text-black dark:text-white sm:block">
                        {member.auth?.name.split(' ')[0]}{' '}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{member?.auth?.role}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{member?.auth?.isAdmin ? 'Admin' : 'Membro'}</p>
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
  );
};

export default MembersDesktopView;
