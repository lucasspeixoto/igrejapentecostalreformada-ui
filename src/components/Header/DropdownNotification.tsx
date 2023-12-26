import Link from 'next/link';
import React from 'react';
import { FaRegBell } from 'react-icons/fa';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [notifying, setNotifying] = React.useState(true);

  const trigger = React.useRef<any>(null);
  const dropdown = React.useRef<any>(null);

  React.useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!dropdownOpen || key !== 'Escape') return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? 'hidden' : 'inline'
          }`}>
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <FaRegBell size={20} className="opacity-80" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-auto w-75 flex-col rounded-sm border border-stroke bg-white shadow-default sm:right-0 sm:w-80 dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}>
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notificações</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="#">
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  Finalize seu cadastro
                </span>{' '}
                Mantenha o seu cadastro atualizado, verifique se preencheu todas
                as informações
              </p>

              <p className="text-xs">15 Nov, 2023</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
