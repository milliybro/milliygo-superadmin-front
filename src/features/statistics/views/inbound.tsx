import { useEffect, useState } from 'react'
import { DatePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import FinanceStatsChart from '../containers/finance-stats-chart'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { ROUTE_PATHS } from '@/config/constants'
import {
  getCompanyChart,
  getGroupCountryTourists,
  getInboundChart,
  getInboundPurpose,
  getInboundTourismCard,
  getMuseumSalesCountry,
  getTopCountry,
} from '../api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import StatisticsInboundStat from '../components/InboundTourism/statistics-inbound'
import AgeGroupStats from '../components/InboundTourism/age-stat'
import CountryStats from '../components/InboundTourism/country-stat'
import StatisticsOfVisits from '../components/InboundTourism/statistics-of-visits'
import TouristChart from '../components/InboundTourism/tourist-chart'
import { useSearchParams } from 'react-router'

const InboundTourism = () => {
  const { t } = useTranslation()
  const currentYear = dayjs().year() - 1
  const [year, setYear] = useState(currentYear)
  const [params] = useSearchParams()
  const start_date = params.get('start_date')
  const end_date = params.get('end_date')

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.statistics'), href: ROUTE_PATHS.MAIN },
      { title: t('statistics.inbound_tourism'), href: '' },
    ])
  }, [t])

  const { data } = useQuery({
    queryKey: ['inbound-card', year],
    queryFn: async () => {
      const res = await getInboundTourismCard({ year })
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

  const { data: museumSalesCountry } = useQuery({
    queryKey: ['museum-sales-country', start_date, end_date],
    queryFn: async () => {
      if (!start_date || !end_date) return null

      const res = await getMuseumSalesCountry({
        start_date,
        end_date,
      })

      return res
    },
    enabled: !!start_date && !!end_date,
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: groupCountryTourists } = useQuery({
    queryKey: ['group-country-tourists'],
    queryFn: async () => {
      const res = await getGroupCountryTourists()

      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: inboundChart } = useQuery({
    queryKey: ['inbound-chart'],
    queryFn: async () => {
      const res = await getInboundChart({
        // year,
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
              {t('statistics.inbound_tourism')}
            </Typography.Text>
            <Typography.Text className="mt-2 text-[16px] font-[400] text-secondary">
              {t('statistics.inbound-desc')}
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
      <div className="grid grid-cols-3 gap-4">
        <StatisticsInboundStat data={data} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AgeGroupStats data={inboundPurposeData} />
        <CountryStats data={TopCountry} />
      </div>
      <StatisticsOfVisits data={museumSalesCountry} />
      <TouristChart data={groupCountryTourists} />
      <FinanceStatsChart
        className="col-span-3"
        data={inboundChart}
      />
    </div>
  )
}

export default InboundTourism
