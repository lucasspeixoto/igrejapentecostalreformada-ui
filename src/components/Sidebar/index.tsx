'use client';

/* eslint-disable @typescript-eslint/no-unused-expressions */
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiOutlinePieChart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsCalendarDate, BsLink45Deg, BsPeople } from 'react-icons/bs';
import { FaWpforms } from 'react-icons/fa';

import { useAuthUserDataContext } from '@/providers/AuthUserDataContextProvider';
import useIsSidebarOpen from '@/store/useIsSidebarOpen';

import { MenuChevroletIcon } from '../Icons';
import SidebarLinkGroup from './SidebarLinkGroup';

const Sidebar = () => {
  const pathname = usePathname();

  const trigger = React.useRef<HTMLButtonElement | null>(null);

  const sidebar = React.useRef<HTMLElement | null>(null);

  const storedSidebarExpanded = 'true';

  const [sidebarExpanded, setSidebarExpanded] = React.useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const { authData } = useAuthUserDataContext()!;

  const setSidebarOpen = useIsSidebarOpen(state => state.setSidebarOpen);

  const sidebarOpen = useIsSidebarOpen(state => state.sidebarOpen);

  const setSidebarOpenHandle = React.useCallback(() => {
    setSidebarOpen();
  }, []);

  /* The click handler is responsible for closing the sidebar when
  a click event occurs outside of the sidebar or the trigger element. It adds an
  event listener for the 'click' event on the document, and when the event is
  triggered, it checks if the sidebar is open and if the click target is not
  within the sidebar or the trigger element. If these conditions are met, it
  sets the sidebarOpen state to false, effectively closing the sidebar. The code
  also includes a cleanup function that removes the event listener when the
  component is */
  React.useEffect(() => {
    const clickHandler = ({ target }: Event) => {
      if (!sidebar.current || !trigger.current) return;

      const targetNode = target as Node | null;

      if (
        !sidebarOpen ||
        sidebar.current.contains(targetNode) ||
        trigger.current.contains(targetNode)
      )
        return;

      setSidebarOpenHandle();
    };

    document.addEventListener('click', clickHandler);

    return () => document.removeEventListener('click', clickHandler);
  });

  /* Adds an event listener to the
 document for the 'keydown' event. When a key is pressed, it checks if the
 sidebar is open and if the key pressed is the 'Escape' key. If both conditions
 are true, it sets the sidebarOpen state to false. */
  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;

      setSidebarOpenHandle();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  /* It checks if the `sidebarExpanded` variable is true or
  false. If it is true, it sets the value of `sidebar-expanded` in the
  localStorage to true and adds the class `sidebar-expanded` to the body
  element. If it is false, it removes the class `sidebar-expanded` from the body
  element. The useEffect hook is triggered whenever the value of
  `sidebarExpanded` changes. */
  React.useEffect(() => {
    if (sidebarExpanded) {
      localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      {/* <!-- Header --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/membros/perfil">
          <Image
            width={176}
            height={32}
            src={'/images/logo/logo.svg'}
            alt="Logo"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen()}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden">
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 p-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu --> */}
          <>
            <h3 className="text-md mb-4 ml-4 font-semibold text-bodydark2">
              Menu
            </h3>

            {/* Listagem de items do menu */}
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Perfil --> */}
              <li>
                <Link
                  href="/membros/perfil"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}>
                  <BiUser size={20} className="text-gray" />
                  Perfil
                </Link>
              </li>

              {/* <!-- Cadastro --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/membros/cadastro' ||
                  pathname.includes('cadastro')
                }>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/membros/cadastro' ||
                            pathname.includes('cadastro')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                        <FaWpforms size={20} className="text-gray" />
                        Cadastro
                        <MenuChevroletIcon open={open} />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate overflow-hidden${
                          !open && ' hidden'
                        }`}>
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/membros/cadastro/pessoal"
                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/membros/cadastro/pessoal' &&
                                'text-white'
                              }`}>
                              Pessoal
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/membros/cadastro/complementar"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/membros/cadastro/complementar' &&
                                'text-white'
                              }`}>
                              Complementar
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/membros/cadastro/eclesiastico"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/membros/cadastro/eclesiastico' &&
                                'text-white'
                              }`}>
                              Eclesiástico
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Membros IPR --> */}
              {authData?.isAdmin ? (
                <li>
                  <Link
                    href="/membros/listagens-de-membros"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('listagens-de-membros') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                    <BsPeople size={20} className="text-gray" />
                    Membros IPR
                  </Link>
                </li>
              ) : null}

              {/* <!-- Indicadores --> */}
              {authData?.isAdmin ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/' || pathname.includes('indicadores')
                  }>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === '/membros/indicadores' ||
                              pathname.includes('indicadores')) &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                          onClick={e => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}>
                          <AiOutlinePieChart size={20} className="text-gray" />
                          Indicadores
                          <MenuChevroletIcon open={open} />
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate overflow-hidden${
                            !open && ' hidden'
                          }`}>
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/membros/indicadores/estatisticos"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname ===
                                    '/membros/indicadores/estatisticos' &&
                                  'text-white'
                                } `}>
                                Estatísticos
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/membros/indicadores/economicos"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname ===
                                    '/membros/indicadores/economicos' &&
                                  'text-white'
                                } `}>
                                Econômicos
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}

              {/* <!-- Calendário --> */}
              <li>
                <Link
                  href="/membros/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}>
                  <BsCalendarDate size={20} className="text-gray" />
                  Calendário
                </Link>
              </li>
            </ul>
          </>

          {/* <!-- Outros --> */}
          <>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              Outros
            </h3>

            {/* Listagem de outros items */}
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Links importantes --> */}
              <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4"
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                        <BsLink45Deg size={20} className="text-gray" />
                        Links Importantes
                        <MenuChevroletIcon open={open} />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate overflow-hidden${
                          !open && ' hidden'
                        }`}>
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              target="_blanck"
                              href="https://www.igrejapentecostalreformada.com.br/"
                              className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white">
                              Site IPR
                            </Link>
                          </li>
                          <li>
                            <Link
                              target="_blanck"
                              href="https://ipr-biblia.vercel.app/"
                              className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white">
                              Bíblia IPR
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
