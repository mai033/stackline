import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const calculateMovingAverage = (data: number[], windowSize: number) => {
  const movingAverages = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const subset = data.slice(start, i + 1);
    const average = subset.reduce((a, b) => a + b, 0) / subset.length;
    movingAverages.push(average);
  }
  return movingAverages;
};

const SalesGraph: React.FC = () => {
  const sales = useSelector((state: RootState) => state.sales.sales);
  const windowSize = 4;

  const retailSales = sales.map((sale) => sale.retailSales);
  const wholesaleSales = sales.map((sale) => sale.wholesaleSales);

  const smoothedRetailSales = calculateMovingAverage(retailSales, windowSize);
  const smoothedWholesaleSales = calculateMovingAverage(
    wholesaleSales,
    windowSize
  );

  const data = {
    labels: sales.map((sale) => sale.weekEnding),
    datasets: [
      {
        label: 'Retail Sales',
        data: smoothedRetailSales,
        borderColor: '#56aff7',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 4,
      },
      {
        label: 'Wholesale Sales',
        data: smoothedWholesaleSales,
        borderColor: '#9ba6bf',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM',
          },
          tooltipFormat: 'MMMM',
        },
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          align: 'center',
          callback: (value: string | number) => {
            const date = new Date(value);
            const month = date
              .toLocaleString('default', { month: 'short' })
              .toUpperCase();
            return month;
          },
          font: {
            family: 'Arial',
            size: 14,
          },
          color: '#9ca3af',
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Arial',
            size: 14,
          },
          color: '#9e9e9e',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-xl font-normal text-gray-500 px-3">Retail Sales</p>
      {sales.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SalesGraph;
