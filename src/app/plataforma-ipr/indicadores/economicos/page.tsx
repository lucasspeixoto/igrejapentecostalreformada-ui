// import Map from "../Maps/TestMap";
// without this the component renders on server and throws an error
import type { Metadata } from 'next';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ChartOne from '@/components/Charts/ChartOne';

export const metadata: Metadata = {
  title: 'Indicadores',
  description: 'Página de indicadores Econômicos',
};

const Indicators: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Indicadores Econômicos" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"></div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
      </div>
    </>
  );
};

export default Indicators;
