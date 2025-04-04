'use client';

import './styles.scss';

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiOutlinePieChart } from 'react-icons/ai';
import { BiBible, BiUser } from 'react-icons/bi';
import { BsCalendarDate, BsLink45Deg, BsPeople } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import { FaChartLine, FaRegMoneyBillAlt, FaTable, FaWpforms } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { IoMdPersonAdd } from 'react-icons/io';
import { MdPieChartOutline } from 'react-icons/md';
import { PiChurch } from 'react-icons/pi';
import { SiStorybook } from 'react-icons/si';

import { useAuthContext } from '@/providers/AuthContextProvider';
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

  const { authData } = useAuthContext()!;

  const setSidebarOpen = useIsSidebarOpen(state => state.setSidebarOpen);

  const sidebarOpen = useIsSidebarOpen(state => state.sidebarOpen);

  const setSidebarOpenHandle = React.useCallback(() => {
    setSidebarOpen();
  }, []);

  React.useEffect(() => {
    const clickHandler = ({ target }: Event) => {
      if (!sidebar.current || !trigger.current) return;

      const targetNode = target as Node | null;

      if (!sidebarOpen || sidebar.current.contains(targetNode) || trigger.current.contains(targetNode))
        return;

      setSidebarOpenHandle();
    };

    document.addEventListener('click', clickHandler);

    return () => document.removeEventListener('click', clickHandler);
  });

  React.useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;

      setSidebarOpenHandle();
    };

    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

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
        <Link href="/plataforma-ipr/perfil">
          <Image width={176} height={32} src={'/images/logo/logo.svg'} alt="Logo" />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen()}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden">
          <GoArrowLeft size={28} className="text-gray" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 p-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu --> */}
          <>
            <h3 className="text-md mb-4 ml-4 font-semibold text-bodydark2">Menu</h3>

            {/* Listagem de items do menu */}
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Perfil --> */}
              <li className={`${pathname.includes('perfil') && 'selected-link'}`}>
                <Link
                  href="/plataforma-ipr/perfil"
                  className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4">
                  <BiUser size={20} />
                  Perfil
                </Link>
              </li>

              {/* <!-- Cadastro --> */}
              <SidebarLinkGroup
                activeCondition={pathname === '/plataforma-ipr/cadastro' || pathname.includes('cadastro')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/plataforma-ipr/cadastro' || pathname.includes('cadastro')) &&
                          'selected-link'
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}>
                        <FaWpforms
                          size={20}
                          className={`${pathname.includes('cadastro') && 'selected-link'}`}
                        />
                        Cadastro
                        <MenuChevroletIcon open={open} />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div className={`translate overflow-hidden${!open && ' hidden'}`}>
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/plataforma-ipr/cadastro/pessoal"
                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/plataforma-ipr/cadastro/pessoal' && 'text-white'
                              }`}>
                              <FaPerson size={16} className="text-white" />
                              Pessoal
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/plataforma-ipr/cadastro/complementar"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/plataforma-ipr/cadastro/complementar' && 'text-white'
                              }`}>
                              <IoMdPersonAdd size={16} className="text-white" />
                              Complementar
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/plataforma-ipr/cadastro/eclesiastico"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/plataforma-ipr/cadastro/eclesiastico' && 'text-white'
                              }`}>
                              <PiChurch size={16} className="text-white" />
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
                    href="/plataforma-ipr/membros"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('membros') && 'selected-link'
                    }`}>
                    <BsPeople
                      size={20}
                      className={`${pathname === '/plataforma-ipr/membros' || (pathname.includes('membros') && 'selected-link')}`}
                    />
                    Membros IPR
                  </Link>
                </li>
              ) : null}

              {/* <!-- Financeiro --> */}
              {authData?.isAdmin ? (
                <SidebarLinkGroup activeCondition={pathname === '/' || pathname.includes('financeiro')}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === '/plataforma-ipr/financeiro' || pathname.includes('financeiro')) &&
                            'selected-link'
                          }`}
                          onClick={e => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}>
                          <FaRegMoneyBillAlt
                            size={20}
                            className={`${pathname.includes('financeiro') && 'selected-link'}`}
                          />
                          Financeiro
                          <MenuChevroletIcon open={open} />
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div className={`translate overflow-hidden${!open && ' hidden'}`}>
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/plataforma-ipr/financeiro/lancamentos"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === '/plataforma-ipr/financeiro/lancamentos' && 'text-white'
                                } `}>
                                <FaTable size={16} className="text-white" />
                                Lançamentos
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/plataforma-ipr/financeiro/relatorios"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === '/plataforma-ipr/financeiro/relatorios' && 'text-white'
                                } `}>
                                <FaChartLine size={16} className="text-white" />
                                Relatórios
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}

              {/* <!-- Indicadores --> */}
              {authData?.isAdmin ? (
                <SidebarLinkGroup activeCondition={pathname === '/' || pathname.includes('indicadores')}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === '/plataforma-ipr/indicadores' ||
                              pathname.includes('indicadores')) &&
                            'selected-link'
                          }`}
                          onClick={e => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}>
                          <AiOutlinePieChart
                            size={16}
                            className={`${pathname.includes('indicadores') && 'selected-link'}`}
                          />
                          Indicadores
                          <MenuChevroletIcon open={open} />
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div className={`translate overflow-hidden${!open && ' hidden'}`}>
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/plataforma-ipr/indicadores/estatisticos"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === '/plataforma-ipr/indicadores/estatisticos' && 'text-white'
                                } `}>
                                <MdPieChartOutline size={16} className="text-white" />
                                Estatísticos
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
                  href="/plataforma-ipr/calendario"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('calendario') && 'selected-link'
                  }`}>
                  <BsCalendarDate
                    size={20}
                    className={`${pathname.includes('calendario') && 'selected-link'}`}
                  />
                  Calendário
                </Link>
              </li>
            </ul>
          </>

          {/* <!-- Outros --> */}
          <>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">Outros</h3>

            {/* Listagem de outros items */}
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Links importantes --> */}
              <SidebarLinkGroup activeCondition={pathname === '/' || pathname.includes('')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4"
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}>
                        <BsLink45Deg size={20} className="text-gray" />
                        Links Importantes
                        <MenuChevroletIcon open={open} />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div className={`translate overflow-hidden${!open && ' hidden'}`}>
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              target="_blanck"
                              href="https://www.igrejapentecostalreformada.com.br/"
                              className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white">
                              <CgWebsite size={16} className="text-white" />
                              Site IPR
                            </Link>
                          </li>
                          <li>
                            <Link
                              target="_blanck"
                              href="https://ipr-biblia.vercel.app/"
                              className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white">
                              <BiBible size={16} className="text-white" />
                              Bíblia Online
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Design System --> */}

              {authData?.isAdmin ? (
                <SidebarLinkGroup
                  activeCondition={pathname === '/plataforma-ipr/ui' || pathname.includes('ui')}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-normal text-gray duration-300 ease-in-out hover:rounded-xl hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === '/plataforma-ipr/ui' || pathname.includes('ui')) &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                          onClick={e => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}>
                          <SiStorybook size={20} className="text-gray" />
                          Design System
                          <MenuChevroletIcon open={open} />
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div className={`translate overflow-hidden${!open && ' hidden'}`}>
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/plataforma-ipr/ui/botoes"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === '/plataforma-ipr/ui/botoes' && 'text-white'
                                } `}>
                                Botões
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/plataforma-ipr/ui/alertas"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === '/plataforma-ipr/ui/alertas' && 'text-white'
                                } `}>
                                Alertas
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
            </ul>
          </>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
