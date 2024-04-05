'use client';

import MemberCard from '@/components/MemberCard';
import { useAuthContext } from '@/providers/AuthContextProvider';

import { usePersonalContext } from '../../../cadastro/pessoal/providers/PersonalContextProvider';

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
