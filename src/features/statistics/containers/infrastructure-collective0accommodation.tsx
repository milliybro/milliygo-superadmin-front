import { Button, Card } from 'antd'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import OrangeChart from '@/assets/orange-chart.jpg'
import { useTranslation } from 'react-i18next'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function InfrastructureCollectiveStatistics({
  data,
  activeTab,
  onTabChange,
}: any) {
  const financeData = useMemo(() => {
    if (!data) return []
    return Object.entries(data).map(([year, value]) => ({
      date: year,
      objects: value,
      guests: value,
    }))
  }, [data])
  const chartOptions = useMemo(
    () => ({
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      fill: {
        type: 'image',
        image: {
          src: [OrangeChart],
          width: undefined,
          height: undefined,
        },
        opacity: 1,
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 4,
          dataLabels: {
            position: 'top',
          },
        },
      },
      colors: ['#77D093'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      xaxis: {
        title: {
          text: '',
        },
        categories: financeData.map(item => item.date),
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          },
        },
        crosshairs: {
          show: false,
        },
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
        show: true,
        borderColor: '#E5E7EB',
        strokeDashArray: 0,
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
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      markers: {
        size: [5],
        colors: ['#77D093'],
        strokeColors: ['#77D093'],
        strokeWidth: [2],
        hover: { size: 7 },
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          fontSize: '12px',
        },
        custom: ({ series, seriesIndex, dataPointIndex }: any) => {
          return `<div style="padding: 8px;">${series[seriesIndex][dataPointIndex]}</div>`
        },
      },

      legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        markers: {
          width: 14,
          height: 14,
          radius: 2,
          fillColors: ['#77D093'],
        },
      },
    }),
    [],
  ) as any

  const { t } = useTranslation()
  const series = useMemo(
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
    <Card className="w-full" style={{ padding: '' }}>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-[18px] font-semibold">
          {t('statistics.collective-accommodation-facilities')}
        </h2>
        <div className="flex items-center gap-3 rounded-lg p-1">
          <Button
            onClick={() => onTabChange('object')}
            className={`rounded rounded-[8px] px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === 'object'
                ? 'border-[#E5E7EB] bg-[#F8FAFC] text-[#232E40]'
                : 'text-[#777E90]'
            }`}
          >
            {t('statistics.by-objects')}
          </Button>
          <Button
            onClick={() => onTabChange('place')}
            className={`rounded rounded-[8px] px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === 'place'
                ? 'border-[#E5E7EB] bg-[#F8FAFC] text-[#232E40]'
                : 'text-[#777E90]'
            }`}
          >
            {t('statistics.by-places')}
          </Button>
        </div>
      </div>
      <div style={{ position: 'relative', height: '375px' }}>
        <Chart options={chartOptions} series={series} type="bar" height={375} />
      </div>
      <div className="mb-2 flex items-center justify-center gap-2">
        <span
          className="inline-block h-3 w-3 rounded-sm text-[14px] font-[500]"
          style={{ backgroundColor: '#FF9D4D' }}
        ></span>
        <span className="text-sm font-medium text-[#374151]">
          {activeTab === 'object'
            ? t('statistics.objects')
            : t('statistics.places')}
        </span>
      </div>
    </Card>
  )
}
