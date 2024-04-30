'use client';

import { INPUTS_VERSUS_OUTPUTS_CHART_OPTIONS } from '@relatorios/constants/inputs-vs-outputs-chart-options';
import dynamic from 'next/dynamic';
import React from 'react';

import { useFinanceReportsContext } from '../../providers/FinanceReportsProvider';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const InputsVersusOutputs: React.FC = () => {
  const { inputsVersusOutputsState, isLoadingFinanceNotes } = useFinanceReportsContext();

  // NextJS Requirement
  const isWindowAvailable = () => typeof window !== 'undefined';

  if (!isWindowAvailable()) return <></>;

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
      </div>

      {!isLoadingFinanceNotes ? (
        <>
          <div className="flex w-full flex-col">
            {inputsVersusOutputsState ? (
              <div id="InputsVersusOutputs" className="-mx-5 h-[355px] w-[105%]">
                <ReactApexChart
                  options={INPUTS_VERSUS_OUTPUTS_CHART_OPTIONS}
                  series={inputsVersusOutputsState!.series}
                  type="area"
                  width="100%"
                  height="100%"
                />
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col">
          <div className="-mx-5 h-[355px] w-[105%]">
            <div className="flex h-full items-center justify-center bg-white dark:bg-boxdark">
              <div className="size-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputsVersusOutputs;
