import Link from 'next/link';

export const AppInfo = () => {
  return (
    <div className="align-center flex w-full flex-col justify-center">
      <span className="my-3 px-0 text-center text-xs sm:px-7 md:text-sm dark:text-white">
        Ao continuar, estou de acordo com os{' '}
        <Link className="text-meta-10 font-medium hover:underline" href="/">
          Termos de Uso
        </Link>{' '}
        e{' '}
        <Link className="text-meta-10 font-medium hover:underline" href="/">
          Aviso de Privacidade
        </Link>{' '}
        da plataforma.
      </span>
      <span className="my-3 px-0 text-center text-xs sm:px-7 md:text-sm dark:text-white">
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply.
      </span>
    </div>
  );
};
