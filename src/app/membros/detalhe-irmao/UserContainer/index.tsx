'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import MemberCard from '@/components/MemberCard';
import { getDocument } from '@/lib/firebase/firestore/getData';
import { useAuthUserDataContext } from '@/providers/AuthUserDataContextProvider';
import type { Process } from '@/types/process';
import type { Personal } from '@/types/register/personal';
import type { UserAuth } from '@/types/user-auth';
import type { UserData } from '@/types/user-data';

import UserBaseData from '../UserBaseData';
import UserUploadPhoto from '../UserUploadPhoto';

const UserContainer: React.FC<{ userId: string }> = ({ userId }) => {
  const userContext = useAuthUserDataContext()!;

  const [selectedPersonalUserData, setSelectedPersonalUserData] =
    React.useState<Personal | null>(null);

  const [selectedAuthUserData, setSelectedAuthUserData] =
    React.useState<UserAuth | null>(null);

  const [selectedProcessUserData, setSelectedProcessUserData] = React.useState<
    Process | undefined
  >(undefined);

  const [isAdminOption, setIsAdminOption] = React.useState(false);

  const [hasMemberDataUpdated, setHasMemberDataUpdated] = React.useState(false);

  const router = useRouter();

  /* Check if the user is an admin and
  redirect them to the profile page if they are not. */
  React.useEffect(() => {
    const isAdmin = userContext.authData?.isAdmin!;

    setIsAdminOption(isAdmin);

    if (isAdmin === false) {
      router.push('/membros/perfil');
    }
  }, [userContext]);

  /* The `React.useEffect` hook is used to perform side effects in a functional
  component. In this case, it is used to fetch data from the Firestore database
  using the `getDocument` function. */
  React.useEffect(() => {
    let mounted = true;

    (async () => {
      const { result } = await getDocument(`users`, userId);

      if (result && mounted) {
        const data = result.data() as UserData;

        setSelectedPersonalUserData(data.personal);

        setSelectedAuthUserData(data.auth);

        setSelectedProcessUserData(data.process);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId, hasMemberDataUpdated]);

  const updateHasMemberDataUpdated = (isLoading: boolean) => {
    setHasMemberDataUpdated(isLoading);
  };

  return (
    <>
      {isAdminOption ? (
        <div className="mt-5 grid grid-cols-5 gap-8">
          <div className="sm-col-span-5 col-span-8 md:col-span-3">
            <UserBaseData
              userId={userId}
              name={selectedAuthUserData?.name!}
              cellphone={selectedPersonalUserData?.cellphone!}
              comments={selectedPersonalUserData?.comments!}
              email={selectedAuthUserData?.email!}
              photoUrl={selectedAuthUserData?.photoUrl!}
              role={selectedAuthUserData?.role!}
              isAdmin={selectedAuthUserData?.isAdmin!}
              isRegistered={selectedProcessUserData?.isRegistered!}
            />
          </div>
          <div className="col-span-8 md:col-span-2">
            <div className="flex w-full flex-col items-center justify-center md:items-start">
              <MemberCard
                name={selectedAuthUserData?.name!}
                role={selectedAuthUserData?.role!}
                birthday={selectedPersonalUserData?.birthday!}
              />

              <UserUploadPhoto
                userId={userId}
                name={selectedAuthUserData?.name!}
                photoUrl={selectedAuthUserData?.photoUrl!}
                onUpdateHasMemberDataUpdated={updateHasMemberDataUpdated}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserContainer;
