import React from 'react';

import Image from '@/components/Image';

type EmptyDataPageProps = {
  title?: string;
  description: string;
};

const EmptyDataPage: React.FC<EmptyDataPageProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex w-auto flex-col items-center gap-2">
      {/* Image */}
      <Image
        src={'/no-data.svg'}
        alt="Imagem Sem resultados"
        width={300}
        height={80}
      />
      {/* Title */}
      {title ? (
        <span
          data-testid="title-id"
          className="text-center text-xl font-bold leading-loose text-black dark:text-white">
          {title}
        </span>
      ) : null}
      {/* Description */}
      <p
        data-testid="description-id"
        className="text-center text-lg font-semibold leading-loose text-black dark:text-white">
        {description}
      </p>
    </div>
  );
};

export default EmptyDataPage;
