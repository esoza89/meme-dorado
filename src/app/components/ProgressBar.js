'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useTranslations } from 'next-intl';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressBar = ({ currentSales, currentTarget }) => {
    const t = useTranslations('tradeComponent');
    const sold = Number(currentSales)
    const target = Number(currentTarget)
    const percentage = ((sold / target) * 100).toFixed(8);

    const data = {
        labels: [t('progress')],
        datasets: [
            {
                label: t('sales'),
                data: [sold],
                backgroundColor: 'rgba(255, 191, 0, 0.82)',
            },
            {
                label: t('reserves'),
                data: [target - sold],
                backgroundColor: 'rgba(110, 110, 112, 0.6)',
            },
        ],
    };

  const options = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${t('progress')}: ${percentage}%`,
        color: 'orange',
        font: {
          size: 16,
          weight: 'bold',
        },
    },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        max: target,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
        <Bar data={data} options={options} height={150}/>
    );
};

export default ProgressBar;
