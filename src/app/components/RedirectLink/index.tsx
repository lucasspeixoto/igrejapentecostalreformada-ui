import Link from 'next/link';

type RedirectLinkProps = {
  text: string;
  textLink: string;
  route: string;
  target?: string;
};

const RedirectLink: React.FC<RedirectLinkProps> = ({ text, textLink, route, target }) => {
  return (
    <p data-testid="redirect-link">
      {text}{' '}
      <Link href={route} target={target || ''} className="text-primary hover:underline">
        {textLink}
      </Link>
    </p>
  );
};

export default RedirectLink;
