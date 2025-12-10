import { useEffect, useState } from 'react'
import { DatePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import FinanceStatsChart from '../containers/finance-stats-chart'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { ROUTE_PATHS } from '@/config/constants'
import {
  getCompanyChart,
  getInboundPurpose,
  getInboundTourismCard,
  getTopCountry,
} from '../api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import StatisticsInboundStat from '../components/InboundTourism/statistics-inbound'
import AgeGroupStats from '../components/InboundTourism/age-stat'
import CountryStats from '../components/InboundTourism/country-stat'
import StatisticsOfVisits from '../components/InboundTourism/statistics-of-visits'
import TouristChart from '../components/InboundTourism/tourist-chart'

const OutboundTourism = () => {
  const { t } = useTranslation()
  const currentYear = dayjs().year() - 1
  const [year, setYear] = useState(currentYear)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.statistics'), href: ROUTE_PATHS.MAIN },
      { title: t('statistics.outbound_tourism'), href: '' },
    ])
  }, [t])

  const { data } = useQuery({
    queryKey: ['inbound-card', year],
    queryFn: async () => {
      const res = await getInboundPurpose({ year })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: inboundPurposeData } = useQuery({
    queryKey: ['inbound-purpose-data', year],
    queryFn: async () => {
      const res = await getInboundPurpose({
        year,
        chart: 'tour_agencies_service',
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  // chart2
  const { data: serviceChartData } = useQuery({
    queryKey: ['tour-agent-chart-data'],
    queryFn: async () => {
      const res = await getCompanyChart({
        // year,
        chart: 'tour_agencies_travel_guides',
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  // chart3
  const { data: TopCountry } = useQuery({
    queryKey: ['top-country-chart-data', year],
    queryFn: async () => {
      const res = await getTopCountry({
        year,
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Typography.Text className="text-2xl font-semibold text-primary-dark">
              {t('statistics.outbound_tourism')}
            </Typography.Text>
            <Typography.Text className="mt-2 text-[16px] font-[400] text-secondary">
              {t('statistics.outbound-desc')}
            </Typography.Text>
          </div>
          <div>
            <DatePicker
              picker="year"
              size="large"
              value={dayjs().year(year)}
              suffixIcon={
                <CalendarIcon className="text-lg text-success-dark" />
              }
              disabledDate={current => current.year() > 2024}
              onChange={value => {
                if (value) {
                  setYear(value.year())
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AgeGroupStats data={inboundPurposeData} />
        <CountryStats data={TopCountry} />
      </div>
      <FinanceStatsChart className="col-span-3" data={serviceChartData} />
    </div>
  )
}

export default OutboundTourism
