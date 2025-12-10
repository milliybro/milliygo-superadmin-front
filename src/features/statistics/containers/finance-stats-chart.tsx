import { Card } from 'antd'
import { Line } from 'react-chartjs-2'
import { twMerge } from 'tailwind-merge'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

import { formatAmount } from '@/helpers/format-amount'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
)

const FinanceStatsChart: FC<{ className?: string; data: any }> = ({
  className,
  data,
}) => {
  const { t } = useTranslation()

  if (!data || typeof data !== 'object') {
    return (
      <Card className={twMerge('w-full', className)}>
        <div className="p-6 text-center text-gray-500">
          {t('no-data', 'Maʼlumot yo‘q')}
        </div>
      </Card>
    )
  }

  const labels = Object.keys(data)
  const values = Object.values(data)

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        backgroundColor: '#111827',
        bodyColor: '#fff',
        mode: 'nearest' as const,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        intersect: false,
        callbacks: {
          title: () => [],
          label: (context: any) => `${formatAmount(context.parsed.y)}`,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false, color: '#E5E7EB' },
        ticks: { color: '#6B7280' },
        border: { display: false },
      },
      x: {
        grid: { color: '#E5E7EB' },
        ticks: { color: '#6B7280' },
        border: { display: false },
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        fill: true,
        backgroundColor: (ctx: any) => {
          const context = ctx.chart.ctx
          const gradient = context.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgba(248, 113, 113, 0.25)')
          gradient.addColorStop(1, 'rgba(248, 113, 113, 0)')
          return gradient
        },
        borderColor: '#FF4B55',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#FF4B55',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FF4B55',
        pointBorderWidth: 2,
        tension: 0,
        pointRadius: 5,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  }

  return (
    <Card
      className={twMerge('w-full', className)}
      classNames={{ body: '!p-0' }}
    >
      <div className="flex flex-col p-4 pb-0">
        <h2 className="text-xl font-bold">
          {t('statistics.dynamics-of-tourist')}
        </h2>
      </div>

      <div className="p-6">
        <Line data={chartData} options={chartOptions} height={70} />
      </div>
    </Card>
  )
}

export default FinanceStatsChart
