import React from 'react';

type MembersTableInfoProps = {
  total: number;
};

const MembersTableInfo: React.FC<MembersTableInfoProps> = ({ total }) => {
  return (
    <>
      <p className="md:text-md text-base font-semibold text-black dark:text-white lg:text-lg">
        Membros Cadastrados <span className="font-bold text-primary">({total})</span>
      </p>
    </>
  );
};

export default MembersTableInfo;
