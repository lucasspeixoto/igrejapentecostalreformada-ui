// import Map from "../Maps/TestMap";
// without this the component renders on server and throws an error
import type { Metadata } from 'next';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import StatisticsContainer from './StatisticsContainer';

export const metadata: Metadata = {
  title: 'Indicadores',
  description: 'Página de indicadores estatísticos',
};

const Indicators: React.FC = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Indicadores Estatísticos" />

      <StatisticsContainer />
    </div>
  );
};

export default Indicators;
