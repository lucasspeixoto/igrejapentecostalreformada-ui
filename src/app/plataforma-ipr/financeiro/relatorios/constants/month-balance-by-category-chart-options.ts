import type { ApexOptions } from 'apexcharts';

export const MONTH_BALANCE_BY_CATEGORY_CHART_OPTIONS: ApexOptions = {
  chart: {
    height: 'auto',
    type: 'bar',
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
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '80%',
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '0.8rem',
      fontWeight: 'bold',
      colors: ['#304758'],
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    labels: {
      style: {
        colors: '#8A99AF',
        fontSize: '0.7rem',
        fontWeight: 'bold',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Valores',
      style: {
        color: '#8A99AF',
        fontSize: '0.9rem',
        fontWeight: 'bold',
      },
    },
    labels: {
      style: {
        colors: '#8A99AF',
        fontSize: '0.9rem',
        fontWeight: 'bold',
      },
    },
  },
  tooltip: {
    y: {
      formatter: (value: number) => `R$ ${value.toFixed(2)}`, // Customize the tooltip value format
      title: {
        formatter: () => 'Valor: ',
      },
    },
  },
};
