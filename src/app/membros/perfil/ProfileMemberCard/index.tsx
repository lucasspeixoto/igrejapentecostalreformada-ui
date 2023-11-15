'use client';

import MemberCard from '@/components/MemberCard';
import { useAuthUserDataContext } from '@/providers/AuthUserDataContextProvider';
import { usePersonalContext } from '@/providers/register/PersonalContextProvider';

const ProfileMemberCard: React.FC = () => {
  const personalContext = usePersonalContext();

  const userProfileContext = useAuthUserDataContext();

  return (
    <MemberCard
      name={userProfileContext.authData?.name!}
      role={userProfileContext.authData?.role!}
      birthday={personalContext.personalData?.birthday!}
      cardMemberDate={personalContext.personalData?.cardMemberDate!}
      cardMemberEmission={personalContext.personalData?.cardMemberEmission!}
    />
  );
};

export default ProfileMemberCard;
