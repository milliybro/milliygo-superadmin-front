import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function TouristChart() {
  const { t } = useTranslation()
  const data = [
    { month: 'Январь', neighboring: 180, cis: 140, other: 180 },
    { month: 'Февраль', neighboring: 220, cis: 100, other: 180 },
    { month: 'Март', neighboring: 200, cis: 120, other: 180 },
    { month: 'Апрель', neighboring: 100, cis: 200, other: 200 },
    { month: 'Май', neighboring: 180, cis: 120, other: 200 },
    { month: 'Июнь', neighboring: 160, cis: 140, other: 200 },
    { month: 'Июль', neighboring: 120, cis: 180, other: 200 },
    { month: 'Август', neighboring: 180, cis: 160, other: 200 },
    { month: 'Сентябрь', neighboring: 180, cis: 120, other: 200 },
    { month: 'Октябрь', neighboring: 180, cis: 120, other: 200 },
    { month: 'Ноябрь', neighboring: 180, cis: 120, other: 200 },
    { month: 'Декабрь', neighboring: 200, cis: 100, other: 200 },
  ]

  const series = [
    {
      name: t('statistics.from_neighboring_countries'),
      data: data.map(d => d.neighboring),
    },
    {
      name: t('statistics.from_cis_countries'),
      data: data.map(d => d.cis),
    },
    {
      name: t('statistics.other_countries'),
      data: data.map(d => d.other),
    },
  ]

  const options = {
    chart: {
      type: 'bar',
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
      categories: data.map(d => d.month),
      labels: { rotate: -45 },
    },
    yaxis: {},
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        const d = data[dataPointIndex]
        const total = d.neighboring + d.cis + d.other
        return `
          <div style="background:#1F2937; color:white; padding:12px; border-radius:8px; border:1px solid #374151;">
            <p style="font-weight:bold; margin-bottom:8px;">Всего за ${d.month}, 2025</p>
            <p style="color:#2196F3; margin:2px 0;">
              <span style="display:inline-block;width:10px;height:10px;background:#2196F3;border-radius:50%;margin-right:5px;"></span>
              ${t('statistics.other_countries')}: ${d.other}
            </p>
            <p style="color:#9C27B0; margin:2px 0;">
              <span style="display:inline-block;width:10px;height:10px;background:#9C27B0;border-radius:50%;margin-right:5px;"></span>
              ${t('statistics.from_cis_countries')}: ${d.cis}
            </p>
            <p style="color:#4CAF50; margin:2px 0;">
              <span style="display:inline-block;width:10px;height:10px;background:#4CAF50;border-radius:50%;margin-right:5px;"></span>
             ${t('statistics.from_neighboring_countries')}: ${d.neighboring}
            </p>
            <p style="border-top:1px solid #6B7280; margin-top:8px; padding-top:4px; font-weight:bold;">
              Итого: ${total}
            </p>
          </div>
        `
      },
    },
    legend: {
      position: 'bottom',
    },
  } as any

  return (
    <div className="w-full bg-white p-4">
      <h1 className="mb-6 text-[18px] font-[600] text-gray-800">
        {t(`statistics.tourists_by_group`)}
      </h1>

      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  )
}
