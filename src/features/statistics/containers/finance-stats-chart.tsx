import { Card } from 'antd'
import dynamic from 'next/dynamic'
import { twMerge } from 'tailwind-merge'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '@/helpers/format-amount'
import CustomLineChart from '@/components/ui/chart/custom-line-chart'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const FinanceStatsChart: FC<{ className?: string; data: any }> = ({
  className,
  data,
}) => {
  const { t } = useTranslation()

  if (!data || typeof data !== 'object') {
    return (
      <Card className={twMerge('h-full', className)}>
        <div className="flex h-64 items-center justify-center">
          {t('no-data', "Ma'lumot yo'q")}
        </div>
      </Card>
    )
  }

  const labels = Object.keys(data)
  const values = Object.values(data)

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: 'straight',
      width: 4,
      colors: ['#FF9D4D'],
    },
    markers: {
      size: 5,
      colors: ['#fff'],
      strokeColors: '#EF4444',
      strokeWidth: 2,
      hover: {
        size: 7,
        sizeOffset: 3,
      },
    },

    xaxis: {
      crosshairs: {
        show: true,
        width: 1,
        // position: 'back', // or 'front'
        stroke: {
          color: '#FF0000', // rang
          width: 3,
          dashArray: 1450,
        },
      },
      categories: labels,
      labels: {
        style: { colors: '#6B7280' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7280' },
        formatter: (val: number) => formatAmount(val),
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => formatAmount(val),
      },
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex]
        return `
      <div style="
        padding: 8px 12px;
        background: #111827;
        color: #fff;
        border-radius: 6px;
        border: 1px solid #E5E7EB;
        text-align: center;
      ">
        ${formatAmount(value)}
      </div>
    `
      },
    },

    grid: {
      strokeDashArray: 4,
      borderColor: '#E5E7EB',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
  }

  const chartSeries = [
    {
      name: 'Обслуженные туристы',
      data: values,
    },
  ] as any

  return (
    <Card className={twMerge('h-full w-full', className)}>
      <div className="-mb-6">
        <h3 className="text-lg font-semibold">
          {t('statistics.dynamics-of-tourist')}
        </h3>
      </div>
      <CustomLineChart data={data} legend={t('statistics.served-tourist')} />
    </Card>
  )
}

export default FinanceStatsChart
