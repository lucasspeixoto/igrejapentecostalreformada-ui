import firebaseMessages from '@fire/messages';
import signOutUserHandler from '@signin/lib/firebase/signout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiUser } from 'react-icons/bi';
import { FaWpforms } from 'react-icons/fa';
import { SlLogout } from 'react-icons/sl';
import { toast } from 'react-toastify';

import { useAuthContext } from '@/providers/AuthContextProvider';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const router = useRouter();

  const authContext = useAuthContext();

  const trigger = React.useRef<any>(null);
  const dropdown = React.useRef<any>(null);

  const signOutUser = async (): Promise<void> => {
    router.push('/login');

    const { error } = await signOutUserHandler();

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateIsLoadingData(false);
    } else {
      authContext.updateIsLoadingData(false);
    }
  };

  // close on click outside
  React.useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  React.useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#">
        <span className="hidden text-left lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {authContext.authData?.name}
          </span>
          <span className="block text-xs">Graça e paz 🙏</span>
        </span>

        <span className="size-12">
          {authContext.authData?.photoUrl ? (
            <Image
              width={112}
              height={112}
              className="size-12 rounded-full"
              src={authContext.authData?.photoUrl}
              alt="User"
            />
          ) : (
            <Image
              width={112}
              height={112}
              className="size-12 rounded-full"
              src={'/images/user/dummy-user.png'}
              alt="User"
            />
          )}
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}>
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <span className="leading-loose text-meta-4 opacity-80 hover:opacity-100 dark:text-gray">
              <Link
                href="/plataforma-ipr/perfil"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base">
                <BiUser size={20} />
                Meu Perfil
              </Link>
            </span>
          </li>
          <li>
            <span className="leading-loose text-meta-4 opacity-80 hover:opacity-100 dark:text-gray">
              <Link
                href="/plataforma-ipr/cadastro/pessoal"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base">
                <FaWpforms size={20} />
                Cadastro
              </Link>
            </span>
          </li>
        </ul>
        <button
          onClick={signOutUser}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium text-meta-4 opacity-80 duration-300 ease-in-out hover:opacity-100 dark:text-gray  lg:text-base">
          <SlLogout size={20} />
          Sair
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
