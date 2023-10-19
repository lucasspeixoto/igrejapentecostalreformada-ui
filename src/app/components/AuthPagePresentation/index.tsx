import Link from 'next/link';

import Image from '@/components/Image';

const AuthPagePresentation = () => {
  return (
    <div className="hidden w-full bg-[url('/images/wallpaper.png')] bg-cover bg-repeat md:block md:w-1/2">
      <div className="flex h-screen flex-col items-center justify-center px-10 py-17.5 text-center">
        <Link className="mb-5.5 inline-block" href="/">
          <Image
            src={'/images/logo/logo.svg'}
            alt="Logo"
            width={300}
            height={80}
          />
        </Link>

        <p className="text-center text-lg leading-loose text-white 2xl:px-20">
          A Bíblia nos apresenta Deus como o Pai Celestial de todos os que
          creram no Seu Filho. A Igreja Pentecostal Reformada é uma família de
          fiéis que descobriram o evangelho, o poder de Deus para a salvação de
          todo aquele que crê <span className="text-meta-7">(Rm 1.16,17)</span>{' '}
          e que se reúnem regularmente para partilhar do amor de Deus, encorajar
          uns aos outros e expressar como uma comunidade local as virtudes do
          Reino de Deus, procurando crescer no conhecimento de Cristo e na
          obediência aos seus mandamentos. Se você procura uma igreja cristã
          bíblica, cristocêntrica e sem os pesados fardos do legalismo
          religioso, venha nos conhecer!
        </p>
      </div>
    </div>
  );
};

export default AuthPagePresentation;
