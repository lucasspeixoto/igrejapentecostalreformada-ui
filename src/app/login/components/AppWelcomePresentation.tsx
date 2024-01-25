import Link from 'next/link';

export const AppWelcomePresentation = () => {
  return (
    <div className="hidden w-[500px] lg:block">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mr-5 text-center text-2xl font-extrabold leading-10 tracking-tight text-black 2xl:mb-4 2xl:w-[450px] 2xl:text-4xl">
          Entre e fique ligado em tudo que acontece
        </h1>

        <Link className="mr-5 inline-block" href="/">
          <img
            src={'/wallpaper.svg'}
            alt="Logo"
            className="h-[20rem] max-h-[85%] w-[30rem] max-w-[600px]"
          />
        </Link>

        <p className="mr-5 text-center text-lg tracking-tight 2xl:w-[550px]  2xl:text-lg">
          A Igreja Pentecostal Reformada é uma família de fiéis que descobriram
          o evangelho, o poder de Deus para a salvação de todo aquele que crê
          (Rm 1.16,17) e que se reúnem regularmente para partilhar do amor de
          Deus.
        </p>
      </div>
    </div>
  );
};
