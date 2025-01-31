'use client';

import './styles.scss';

import dynamic from 'next/dynamic';
import React from 'react';

import { convertTotalValuesToXYArray } from '@/app/plataforma-ipr/financeiro/lancamentos/utils/total-values-by-category';
import { MONTH_BALANCE_BY_CATEGORY_CHART_OPTIONS } from '@/app/plataforma-ipr/financeiro/relatorios/constants/month-balance-by-category-chart-options';

import { useFinanceNotesContext } from '../../lancamentos/providers/FinanceNotesProvider';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const MonthBalanceCategoryChart = () => {
  const { totalValuesByCategory } = useFinanceNotesContext();

  const series = [
    {
      data: convertTotalValuesToXYArray(totalValuesByCategory),
    },
  ];

  return (
    <div className="area">
      <h3 className="area__title">Distribuição</h3>
      <div className="area__chart">
        <ReactApexChart
          options={MONTH_BALANCE_BY_CATEGORY_CHART_OPTIONS}
          series={series}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default MonthBalanceCategoryChart;
