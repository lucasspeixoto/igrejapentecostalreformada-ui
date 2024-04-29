'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import type { Period } from '../types/period';
import { computePeriodDetail } from '../utils/compute-period-detail';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#FF6766'],
  chart: {
    // events: {
    //   beforeMount: (chart) => {
    //     chart.windowResizeHandler();
    //   },
    // },
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3C50E0', '#FF6766'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 10000,
  },
};

interface MonthInputsAndOutputsState {
  series: {
    name: string;
    data: number[];
  }[];
}

const MonthInputsAndOutputs: React.FC = () => {
  const [period, setPeriod] = React.useState('monthly');
  const [dateRange, setDateRange] = React.useState(computePeriodDetail('monthly'));
  const [state, setState] = useState<MonthInputsAndOutputsState>({
    series: [
      {
        name: 'Entradas',
        data: [4850, 7850, 3500, 6580, 5500, 2700, 4700, 5900, 8450, 7850, 6020, 5890],
      },

      {
        name: 'Saídas',
        data: [3025, 5000, 4280, 3800, 5005, 4000, 2950, 5700, 5420, 4200, 4050, 4150],
      },
    ],
  });

  const handleReset = () => {
    setState(prevState => ({ ...prevState }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  handleReset;

  // NextJS Requirement
  const isWindowAvailable = () => typeof window !== 'undefined';

  if (!isWindowAvailable()) return <></>;

  const changePeriodHandler = (selectedPeriod: Period): void => {
    setPeriod(selectedPeriod);
    const detail = computePeriodDetail(selectedPeriod);

    setDateRange(detail);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-1">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Entradas</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-meta-7">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-meta-7"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-meta-7">Saídas</p>
            </div>
          </div>
        </div>
        <div className="flex w-auto max-w-45 flex-col justify-start gap-2">
          <div className="inline-flex items-center rounded-md bg-whiter dark:bg-meta-4">
            <button
              onClick={() => changePeriodHandler('weekly')}
              className={`rounded px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card  dark:text-white dark:hover:bg-boxdark  ${period === 'weekly' && 'bg-white dark:bg-boxdark'}`}>
              Semana
            </button>
            <button
              onClick={() => changePeriodHandler('monthly')}
              className={`rounded px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card  dark:text-white dark:hover:bg-boxdark  ${period === 'monthly' && 'bg-white dark:bg-boxdark'}`}>
              Mês
            </button>
            <button
              onClick={() => changePeriodHandler('yearly')}
              className={`rounded px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card  dark:text-white dark:hover:bg-boxdark  ${period === 'yearly' && 'bg-white dark:bg-boxdark'}`}>
              Ano
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-end justify-end">
        <span className="text-md mr-5 mt-4 font-medium">{dateRange}</span>
        <div id="MonthInputsAndOutputs" className="-mx-5 h-[355px] w-[105%]">
          <ReactApexChart options={options} series={state.series} type="area" width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default MonthInputsAndOutputs;
