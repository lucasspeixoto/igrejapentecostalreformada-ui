'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

import type { UserData } from '@/types/user-data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    type: 'donut',
  },
  colors: ['#259AE6', '#FF6766', '#10B981'],
  labels: ['Homens', 'Mulheres', 'Sem Cadastro'],
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ManAndWomanChart: React.FC<{ userData: UserData[] }> = ({ userData }) => {
  const totalOfMembers = userData.length;

  const personalData = React.useMemo(() => userData.map(user => user.personal), [userData]);

  const isManTotal = React.useMemo(() => {
    return personalData.reduce(
      (element, personal) => (personal?.sex === 'Masculino' ? element + 1 : element),
      0
    );
  }, [userData]);

  const isWomanTotal = React.useMemo(() => {
    return personalData.reduce(
      (element, personal) => (personal?.sex === 'Feminino' ? element + 1 : element),
      0
    );
  }, [userData]);

  const sex = {
    series: [isManTotal, isWomanTotal, totalOfMembers - (isManTotal + isWomanTotal)],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">Sexo</h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="manAndWomanChart" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={sex.series} type="donut" width={'100%'} height={300} />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-meta-5"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Homens </span>
              <span> {isManTotal} </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-meta-7"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Mulheres </span>
              <span> {isWomanTotal} </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-meta-3"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Sem Cadastro </span>
              <span> {totalOfMembers - (isWomanTotal + isManTotal)} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManAndWomanChart;
