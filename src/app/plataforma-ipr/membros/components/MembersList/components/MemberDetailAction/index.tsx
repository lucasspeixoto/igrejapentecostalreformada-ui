import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';

type MemberDetailActionProps = {
  userId: string;
};

const MemberDetailAction: React.FC<MemberDetailActionProps> = ({ userId }) => {
  const router = useRouter();

  const seeUserDetailHandler = () => {
    router.push(`detalhe-irmao/${userId}`);
  };

  return (
    <button className="hover:text-meta-5">
      <AiOutlineEye size={20} onClick={() => seeUserDetailHandler()} />
    </button>
  );
};

export default MemberDetailAction;
