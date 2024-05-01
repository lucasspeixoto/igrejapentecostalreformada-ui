import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TooltipProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  text?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ className, children, text }) => {
  const compositeClassName = twMerge('group relative flex cursor-pointer justify-center', className);

  return (
    <div className={compositeClassName}>
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
