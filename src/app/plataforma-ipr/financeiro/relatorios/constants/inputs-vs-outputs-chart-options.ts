import type { ApexOptions } from 'apexcharts';

export const INPUTS_VERSUS_OUTPUTS_CHART_OPTIONS: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#FF6766'],
  chart: {
    events: {
      beforeMount: chart => {
        chart.windowResizeHandler();
      },
    },
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
    enabled: true,
    formatter: value => {
      const val = value as number;
      return val.toFixed(2);
    },
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
    labels: {
      style: {
        colors: '#8A99AF',
        fontSize: '12px',
        fontFamily: 'Satoshi, sans-serif',
        fontWeight: 700,
        cssClass: 'apexcharts-xaxis-label',
      },
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    labels: {
      formatter(val) {
        return val.toFixed(0);
      },
      style: {
        colors: ['#8A99AF'],
        fontSize: '12px',
        fontFamily: 'Satoshi, sans-serif',
        fontWeight: 700,
        cssClass: 'apexcharts-yaxis-label',
      },
    },
    min: 0,
  },
};
