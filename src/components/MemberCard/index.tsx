'use client';

import { fibebaseDateConvert } from '@/utils/transforme-date';

type MemberCardProps = {
  name: string;
  role: string;
  birthday: string;
};

const MemberCard: React.FC<MemberCardProps> = ({ name, role, birthday }) => {
  return (
    <div className="flex-column mt-5 flex h-auto items-center justify-center gap-1 sm:gap-5 md:mt-0">
      <div className="hover:shadow-red relative float-left flex h-56 justify-start rounded-xl text-white shadow-2xl transition-transform md:h-64">
        <img
          className="relative h-full w-full rounded-xl object-cover"
          src={'/images/cards/member-card.png'}
          alt="Imagem carteiriha"
        />

        <div className="absolute top-4 w-full px-2 md:top-6 md:px-8">
          <div className="flex flex-col justify-between gap-0 md:gap-2">
            <div className="flex justify-between">
              <div className="flex flex-col items-start">
                <p className="font-light">Nome</p>
                <p className="font-medium tracking-widest">{name}</p>
              </div>
              <img
                className="h-14 w-14"
                src={'/images/logo/logo-church-cross.svg'}
                alt="Imagem logo cartão"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col items-start">
                <p className="font-light">Cargo</p>
                <p className="font-medium tracking-widest">{role}</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-light">Aniversário</p>
                <p className="font-medium tracking-widest">
                  {birthday ? fibebaseDateConvert(birthday) : '-/-/-'}
                </p>
              </div>
            </div>

            <div className="pr-6 pt-4">
              <div className="flex justify-start gap-10">
                <div className="flex flex-col items-start">
                  <p className="text-xs font-light">Membro desde</p>
                  <p className="text-sm font-medium tracking-wider">01/20</p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-xs font-light">Emissão</p>
                  <p className="text-sm font-medium tracking-wider">11/23</p>
                </div>
              </div>
            </div>

            <div className="mb-1 mt-3 flex w-full items-center justify-center">
              <p className="text-md text-xs font-semibold uppercase">
                Fazer tudo para a glória de Deus, 1 Co 10.21
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
