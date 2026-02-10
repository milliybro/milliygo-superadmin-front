import { formatAmount } from '@/helpers/format-amount'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface CountryData {
  name: string
  key: 'mdx_countries' | 'neighboring_countries' | 'other_countries'
  total: number
}

export default function TouristChart({ data }: { data: any }) {
  const { t } = useTranslation()

  const years = Object.keys(data || {}).sort()

  const safeGet = (year: string, key: CountryData['key']) => {
    const list = data[year]
    if (!Array.isArray(list)) return 0
    const item = list.find(e => e.key === key)
    return item?.total ?? 0
  }

  const series = [
    {
      name: t('statistics.from_cis_countries'),
      data: years.map(year => safeGet(year, 'mdx_countries')),
    },
    {
      name: t('statistics.from_neighboring_countries'),
      data: years.map(year => safeGet(year, 'neighboring_countries')),
    },
    {
      name: t('statistics.other_countries'),
      data: years.map(year => safeGet(year, 'other_countries')),
    },
  ]

  const options = {
    dataLabels: {
      enabled: false,
      background: {
        enabled: false,
      },
      formatter: function (val: any) {
        if (val === null || val === undefined || isNaN(val)) return ''
        return Number(val).toLocaleString()
      },
      style: {
        fontSize: '12px',
        fontWeight: 600,
        colors: ['#ffffff'],
      },
    },
    chart: {
      type: 'bar' as const,
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30px',
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: years,
      labels: { rotate: -45 },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => formatAmount(val),
      },
    },
    tooltip: {
      theme: 'dark' as const,
      style: {
        fontSize: '12px',
      },
    },
    legend: {
      position: 'bottom' as const,
    },
    colors: ['#4CAF50', '#9C27B0', '#2196F3'],
  }

  const getTooltipContent = (dataPointIndex: number) => {
    const year = years[dataPointIndex]
    const info = data[year]

    const mdx = info.find((i: any) => i.key === 'mdx_countries')?.total || 0
    const neighboring =
      info.find((i: any) => i.key === 'neighboring_countries')?.total || 0
    const other = info.find((i: any) => i.key === 'other_countries')?.total || 0
    const total = mdx + neighboring + other

    return `
      <div style="background:#1F2937; color:white; padding:12px; border-radius:8px; border:1px solid #374151; min-width:250px;">
        <p style="font-weight:bold; margin-bottom:8px; font-size:14px;">${year} ${t('statistics.total')}</p>
        
        <p style="color:#4CAF50; margin:4px 0; font-size:12px;">
          <span style="display:inline-block;width:8px;height:8px;background:#4CAF50;border-radius:50%;margin-right:6px;"></span>
          ${t('statistics.from_cis_countries')}: <strong>${mdx.toLocaleString()}</strong>
        </p>
        
        <p style="color:#9C27B0; margin:4px 0; font-size:12px;">
          <span style="display:inline-block;width:8px;height:8px;background:#9C27B0;border-radius:50%;margin-right:6px;"></span>
          ${t('statistics.from_neighboring_countries')}: <strong>${neighboring.toLocaleString()}</strong>
        </p>
        
        <p style="color:#2196F3; margin:4px 0; font-size:12px;">
          <span style="display:inline-block;width:8px;height:8px;background:#2196F3;border-radius:50%;margin-right:6px;"></span>
          ${t('statistics.other_countries')}: <strong>${other.toLocaleString()}</strong>
        </p>
        
        <p style="border-top:1px solid #6B7280; margin-top:8px; padding-top:6px; font-weight:bold; font-size:13px;">
          ${t('statistics.total')}: ${total.toLocaleString()}
        </p>
      </div>
    `
  }

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-sm">
      <h1 className="mb-6 text-[18px] font-[600] text-gray-800">
        {t('statistics.tourists_by_group')}
      </h1>

      <Chart
        options={{
          ...options,
          tooltip: {
            ...options.tooltip,
            custom: ({ dataPointIndex }: { dataPointIndex: number }) =>
              getTooltipContent(dataPointIndex),
          },
        }}
        series={series}
        type="bar"
        height={400}
      />
    </div>
  )
}
