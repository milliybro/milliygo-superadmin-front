import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'antd'
import GreenChart from '@/assets/green-chart.jpg'
import { useTranslation } from 'react-i18next'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function InfrastructureOrganizationChart({
  data,
  activeTab,
  onTabChange,
}: any) {
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
      sparkline: { enabled: false },
      chart: {
        type: 'bar',
        toolbar: { show: false },
        sparkline: { enabled: false },
      },
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
        categories: financeData.map(item => item.date), // 🎯 Shu joy
        labels: {
          style: { colors: '#6B7280', fontSize: '12px' },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: {
          text: '',
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
            fontWeight: 500,
          },
          offsetX: -16,
          offsetY: 0,
        },
        axisBorder: {
          show: false,
        },
      },
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
        name:
          activeTab === 'object'
            ? t('statistics.objects')
            : t('statistics.places'),
        type: 'column',
        data:
          activeTab === 'object'
            ? financeData.map(item => item.objects)
            : financeData.map(item => item.guests),
      },
    ],
    [financeData, activeTab, t],
  ) as any

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow">
      <div className=" flex flex-row items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-800">
          {t('statistics.recreation-and-tourism')}
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

      <div className="w-full" style={{ height: '370px' }}>
        <Chart
          options={combinedChartOptions}
          series={combinedChartSeries}
          type="line"
          height={370}
        />
      </div>

      <div className="mt-0 flex items-center justify-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-[#77D093]"></span>
        <span className="text-sm font-medium text-[#374151]">
          {activeTab === 'object'
            ? t('statistics.objects')
            : t('statistics.places')}
        </span>
      </div>
    </div>
  )
}
