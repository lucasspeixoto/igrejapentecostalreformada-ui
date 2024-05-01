import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';

import Image from '@/components/Image';
import type { UserData } from '@/types/user-data';
import { orderMembersListByName } from '@/utils/array-operations';

import MemberDeleteAction from '../MemberDeleteAction';
import MemberDetailAction from '../MemberDetailAction';

type MembersMobileViewProps = {
  members: UserData[];
};

const MembersMobileView: React.FC<MembersMobileViewProps> = ({ members }) => {
  return (
    <div className="py-2">
      <div className="flex max-w-full flex-wrap items-center justify-center gap-4">
        {React.Children.toArray(
          members.sort(orderMembersListByName).map(member => (
            <div className="w-[250px] rounded-lg bg-white px-1 py-2 drop-shadow-1 hover:cursor-pointer hover:shadow-default dark:border-none dark:bg-boxdark dark:drop-shadow-none">
              <div className="flex flex-row items-center justify-start gap-2">
                <>
                  {member.auth?.photoUrl ? (
                    <Image
                      src={member.auth?.photoUrl!}
                      alt="Foto membro"
                      width={42}
                      height={42}
                      className="size-10 rounded-full"
                    />
                  ) : (
                    <Image
                      src={'/images/user/dummy-user.png'}
                      alt="Dummy User"
                      width={42}
                      height={42}
                      className="size-10 rounded-full"
                    />
                  )}
                </>

                <div className="flex flex-col">
                  <p className="text-md font-medium text-primary dark:text-white">
                    {member.auth?.name.split(' ')[0]}
                  </p>
                  <p className="text-sm font-medium text-meta-3 dark:text-white">{member?.auth?.role}</p>
                </div>
              </div>

              <span className="text-md mt-4  break-all font-medium tracking-tight text-black dark:text-white">
                {member?.auth?.isAdmin ? 'Admin' : 'Membro'}
              </span>

              <p className="text-gray-500 dark:text-gray-400 mb-3 w-full truncate font-normal hover:text-clip">
                {member?.process?.isRegistered ? (
                  <AiOutlineCheckCircle size={20} className="text-meta-3" />
                ) : (
                  <BiBlock size={20} className="text-meta-7" />
                )}
              </p>

              <div className="flex w-full justify-end">
                <div className="flex gap-2 self-end">
                  <MemberDetailAction userId={member?.auth.userId} />

                  <MemberDeleteAction userId={member?.auth.userId} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MembersMobileView;
