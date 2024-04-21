import React from 'react';

type TooltipProps = {
  children: React.ReactNode;
  text?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <div className="group relative flex cursor-pointer justify-center">
      {children}
      {text ? (
        <span className="absolute bottom-5 right-5 min-w-[200px] max-w-[250px] scale-0 break-keep rounded bg-boxdark p-2 text-xs text-white transition-all group-hover:scale-100">
          {text}
        </span>
      ) : null}
    </div>
  );
};

export default Tooltip;
