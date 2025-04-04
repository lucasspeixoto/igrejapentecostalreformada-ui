import './styles.scss';

import Link from 'next/link';

const AuthPagePresentation = () => {
  return (
    <div className="container">
      <h1 className="container__title">Plataforma Igreja Pentecostal Refomada</h1>

      <Link className="container__link" href="/">
        <img src={'/images/logo/logo.svg'} alt="Logo" className="h-80 max-h-[75%] w-[30rem] max-w-[600px]" />
      </Link>

      <p className="container__description">
        A Bíblia nos apresenta Deus como o Pai Celestial de todos os que creram no Seu Filho. A Igreja
        Pentecostal Reformada é uma família de fiéis que descobriram o evangelho, o poder de Deus para a
        salvação de todo aquele que crê
      </p>
    </div>
  );
};

export default AuthPagePresentation;
