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
  colors: ['#DC3545', '#FFBA00'],
  labels: ['Campinas', 'Outras Cidades'],
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

const CityDistribuitionChart: React.FC<{ userData: UserData[] }> = ({ userData }) => {
  const personalData = React.useMemo(() => userData.map(user => user.personal), [userData]);

  const isFromCampinasTotal = React.useMemo(() => {
    return personalData.reduce(
      (element, personal) => (personal?.city?.toLowerCase() === 'campinas' ? element + 1 : element),
      0
    );
  }, [userData]);

  const isNotFromCampinasTotal = React.useMemo(() => {
    return personalData.reduce(
      (element, personal) => (personal?.city?.toLowerCase() !== 'campinas' ? element + 1 : element),
      0
    );
  }, [userData]);

  const cityData = {
    series: [isFromCampinasTotal, isNotFromCampinasTotal],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">Cidades</h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="mandAndWomanChart" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={cityData.series}
            type="donut"
            width={'100%'}
            height={300}
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-meta-1"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Campinas </span>
              <span> {isFromCampinasTotal} </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-meta-6"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Outras Cidades </span>
              <span> {isNotFromCampinasTotal} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDistribuitionChart;
