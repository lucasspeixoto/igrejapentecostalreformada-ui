import Link from 'next/link';

const AuthPagePresentation = () => {
  return (
    <div className="hidden w-[500px] lg:block">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mr-5 text-center text-2xl font-extrabold leading-10 tracking-tight text-black dark:text-white 2xl:mb-4 2xl:w-[450px] 2xl:text-4xl">
          Plataforma Igreja pentecostal refomada
        </h1>

        <Link className="mr-5 inline-block" href="/">
          <img
            src={'/images/logo/logo.svg'}
            alt="Logo"
            className="h-80 max-h-[75%] w-[30rem] max-w-[600px]"
          />
        </Link>

        <p className="mr-5 text-center text-lg tracking-tight 2xl:w-[450px] 2xl:text-lg">
          A Bíblia nos apresenta Deus como o Pai Celestial de todos os que creram no Seu Filho. A Igreja
          Pentecostal Reformada é uma família de fiéis que descobriram o evangelho, o poder de Deus para a
          salvação de todo aquele que crê
        </p>
      </div>
    </div>
  );
};

export default AuthPagePresentation;
