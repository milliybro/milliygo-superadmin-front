import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'antd'
import BlueChart from '@/assets/blue-chart.jpg'
import { useTranslation } from 'react-i18next'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function InfrastructureHotelSectorStatistics({
  data,
  activeTab,
  onTabChange,
}: any) {
  if (!data) {
    return <div>Loading...</div>
  }

  const years = useMemo(() => Object.keys(data.main_data), [data])

  const objectsData = useMemo(
    () => years.map(y => data.main_data[y]),
    [data, years],
  )

  const guestData = useMemo(
    () => years.map(y => data.guest_data[y]),
    [data, years],
  )

  const combinedChartOptions = useMemo(
    () => ({
      chart: {
        type: 'line',
        toolbar: { show: false },
        sparkline: { enabled: false },
      },
      fill: {
        type: ['image', 'solid'],
        image: {
          src: [BlueChart],
        },
        opacity: 1,
      },
      colors: ['#3b82f6', '#ef4444'],
      stroke: {
        curve: 'smooth',
        width: [0, 2],
      },
      plotOptions: {
        bar: {
          columnWidth: '30px',
          borderRadius: 4,
        },
      },
      markers: {
        size: [0, 5],
        colors: ['#3b82f6', '#fff'],
        strokeColors: ['#3b82f6', '#ef4444'],
        strokeWidth: [0, 2],
        hover: { size: 7 },
        borderRadius: 4,
      },
      dataLabels: { enabled: false },

      xaxis: {
        categories: years,
        axisBorder: { show: true },
        axisTicks: { show: true },
        labels: {
          style: { colors: '#6B7280', fontSize: '12px' },
        },
      },

      yaxis: [
        {
          labels: {
            style: { colors: '#777E90', fontSize: '12px', fontWeight: 500 },
            offsetX: -16,
          },
        },
      ],

      grid: {
        borderColor: '#E5E7EB',
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: { fontSize: '12px' },
        shared: false,
        intersect: false,
      },
      legend: {
        markers: {
          width: 12, 
          height: 12, 
          radius: 12, 
          shape: 'rect', 
        },
      },
    }),
    [years],
  ) as any
  const { t } = useTranslation()

  const combinedChartSeries = useMemo(
    () => [
      {
        name: t('statistics.objects'),
        type: 'column',
        data: objectsData,
      },
      {
        name: t('common.guests'),
        type: 'line',
        data: guestData,
        marker: {
          size: 6,
          colors: '#ffffff', // markaz oq
          strokeColors: '#ef4444', // qizil border
          strokeWidth: 3,
          hover: {
            size: 8,
          },
        },
      },
    ],
    [objectsData, guestData, t],
  )

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-800">
          {t('statistics.hotel-sector-stat')}
        </h2>
        <div className="flex items-center gap-2 rounded-lg p-1">
          <Button
            onClick={() => onTabChange('object')}
            className={`rounded-[6px] px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === 'object'
                ? 'border-[#E5E7EB] bg-[#F8FAFC] text-[#232E40]'
                : 'text-[#777E90]'
            }`}
          >
            {t('statistics.by-objects')}
          </Button>
          <Button
            onClick={() => onTabChange('place')}
            className={`rounded-[8px] px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === 'place'
                ? 'border-[#E5E7EB] bg-[#F8FAFC] text-[#232E40]'
                : 'text-[#777E90]'
            }`}
          >
            {t('statistics.by-places')}
          </Button>
        </div>
      </div>

      <div className="w-full" style={{ height: '400px' }}>
        <Chart
          options={combinedChartOptions}
          series={combinedChartSeries}
          type="line"
          height={400}
        />
      </div>
    </div>
  )
}
