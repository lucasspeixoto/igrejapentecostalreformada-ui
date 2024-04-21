'use client';

import { longDateConvert, shortDateConvert } from '@/utils/transform-date';

type MemberCardProps = {
  name: string;
  role: string;
  birthday: string;
  cardMemberDate: string;
  cardMemberEmission: string;
};

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  birthday,
  cardMemberDate,
  cardMemberEmission,
}) => {
  return (
    <div className="flex-column mx-0 flex h-auto w-full items-center justify-center gap-1 sm:gap-5 md:mt-0">
      <div className="hover:shadow-red py-auto relative float-left flex h-48 justify-start rounded-xl text-white shadow-2xl transition-transform sm:h-64">
        <img
          className="relative w-full rounded-xl object-cover"
          src={'/images/cards/member-card.png'}
          alt="Imagem carteirinha"
        />

        <div className="absolute top-4 w-full px-2 md:top-6 md:px-8">
          <div className="flex h-auto flex-col justify-between gap-0 md:gap-2">
            <div className="flex justify-between">
              <div className="flex flex-col items-start">
                <p className="font-light">Nome</p>
                <p className="text-sm font-semibold tracking-widest">{name}</p>
              </div>
              <img
                className="size-8 sm:size-14"
                src={'/images/logo/logo-church-cross.svg'}
                alt="Imagem logo cartão"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col items-start">
                <p className="font-light">Cargo</p>
                <p className="text-sm font-semibold tracking-widest">{role}</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-light">Aniversário</p>
                <p className="text-sm font-semibold tracking-widest">
                  {longDateConvert(birthday)}
                </p>
              </div>
            </div>

            <div className="pr-6 pt-2">
              <div className="flex justify-start gap-10">
                <div className="flex flex-col items-start">
                  <p className="text-xs font-light">Membro desde</p>
                  <p className="text-sm font-semibold tracking-wider">
                    {shortDateConvert(cardMemberDate)}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-xs font-light">Emissão</p>
                  <p className="text-sm font-semibold tracking-wider">
                    {shortDateConvert(cardMemberEmission)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-1 mt-2 flex w-full items-center justify-center">
              <p className="text-xs font-semibold uppercase">
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
