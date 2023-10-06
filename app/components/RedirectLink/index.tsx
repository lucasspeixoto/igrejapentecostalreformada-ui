import Link from 'next/link';

interface RedirectLinkProps {
  text: string;
  textLink: string;
  route: string;
}

const RedirectLink: React.FC<RedirectLinkProps> = ({
  text,
  textLink,
  route,
}) => {
  return (
    <p>
      {text}{' '}
      <Link href={route} className="text-primary hover:underline">
        {textLink}
      </Link>
    </p>
  );
};

export default RedirectLink;
