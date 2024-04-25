'use client';

import { usePersonalContext } from '@cadastro/pessoal/providers/PersonalContextProvider';

import MemberCard from '@/app/components/MemberCard';
import { useAuthContext } from '@/providers/AuthContextProvider';

const ProfileMemberCard: React.FC = () => {
  const personalContext = usePersonalContext();

  const userProfileContext = useAuthContext();

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
