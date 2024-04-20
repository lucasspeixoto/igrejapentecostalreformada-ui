import React from 'react';

type TooltipProps = {
  children: React.ReactNode;
  text?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <div className="group relative m-12 flex cursor-pointer justify-center">
      {children}
      {text ? (
        <>
          <p className="break-word light:bg-gray-800 text-dark absolute top-10 scale-0 rounded bg-white p-2 text-xs transition-all group-hover:scale-100 dark:text-white">
            {text}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default Tooltip;
