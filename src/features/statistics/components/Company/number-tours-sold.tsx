import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import GreenChart from '@/assets/green-chart.jpg'
import { useTranslation } from 'react-i18next'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

// interface ChartData {
//   [year: string]: number
// }

// interface Props {
//   data?: ChartData
//   activeTab: string
//   onTabChange: (tab: string) => void
// }

export default function NumberToursSoldChart({ data }: any) {
  const { t } = useTranslation()

  const financeData = useMemo(() => {
    if (!data) return []
    return Object.entries(data).map(([year, value]) => ({
      date: year,
      objects: value,
      guests: value,
    }))
  }, [data])

  const combinedChartOptions = useMemo(
    () => ({
      chart: { type: 'bar', toolbar: { show: false } },
      colors: ['#77D093'],

      plotOptions: { bar: { columnWidth: '30px', borderRadius: 4 } },
      dataLabels: { enabled: false },
      tooltip: {
        enabled: true,
        theme: 'dark',
        intersect: false,
        shared: false,
      },
      fill: {
        type: ['image', 'solid'],
        gradient: { colors: ['#EF4444', '#EF4444'] },
        image: { src: [GreenChart], width: undefined, height: undefined },
        opacity: 1,
      },
      xaxis: {
        categories: financeData.map(item => item.date),
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: '#6B7280', fontSize: '12px' } },
      },
      yaxis: [
        {
          labels: {
            style: { colors: '#777E90', fontSize: '12px', fontWeight: 500 },
            offsetX: -16,
          },
          axisBorder: { show: false },
        },
      ],
      grid: {
        borderColor: '#E5E7EB',
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
    }),
    [financeData],
  ) as any

  const combinedChartSeries = useMemo(
    () => [
      {
        name: t('statistics.selling-tours'),
        type: 'column',
        data: financeData.map(item => item.objects),
      },
    ],
    [financeData, t],
  ) as any

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-800">
          {t('statistics.number-of-tours')}
        </h2>
      </div>

      <div className="w-full" style={{ height: '350px' }}>
        <Chart
          options={combinedChartOptions}
          series={combinedChartSeries}
          type="line"
          height={350}
        />
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-[#77D093]"></span>
        <span className="text-sm font-medium text-[#374151]">
          {t('statistics.selling-tours')}
        </span>
      </div>
    </div>
  )
}
