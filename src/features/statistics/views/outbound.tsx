import { useEffect, useState } from 'react'
import { DatePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { ROUTE_PATHS } from '@/config/constants'
import {
  getCompanyChart,
  getOutboundChart,
  getOutboundPurpose,
  getOutboundTopCountry,
  getTopCountry,
} from '../api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import AgeGroupStats from '../components/OutboundTourism/age-stat'
import CountryStats from '../components/OutboundTourism/country-stat'
import FinanceStatsChart from '../components/OutboundTourism/statistics-chart'
import InfrastructureLoader from '../components/InfrastructureLoader'

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

  const { data, isLoading: isLoadingChart1 } = useQuery({
    queryKey: ['outbound-card', year],
    queryFn: async () => {
      const res = await getOutboundPurpose({ year })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: outboundTopCountry, isLoading: isLoadingChart2 } = useQuery({
    queryKey: ['outbound-top-country', year],
    queryFn: async () => {
      const res = await getOutboundTopCountry({
        year,
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: serviceChartData, isLoading: isLoadingChart3 } = useQuery({
    queryKey: ['tour-agent-chart-data'],
    queryFn: async () => {
      const res = await getCompanyChart({
        chart: 'tour_agencies_travel_guides',
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: OutboundChart, isLoading: isLoadingChart4 } = useQuery({
    queryKey: ['outbound-chart-data', year],
    queryFn: async () => {
      const res = await getOutboundChart({
        year,
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const isGlobalLoading =
    isLoadingChart1 ||
    isLoadingChart2 ||
    isLoadingChart3 ||
    isLoadingChart4

  if (isGlobalLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center min-h-screen">
        <InfrastructureLoader />
      </div>
    )
  }

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
        <AgeGroupStats data={data} />
        <CountryStats data={outboundTopCountry} />
      </div>
      <FinanceStatsChart className="col-span-3" data={OutboundChart} />
    </div>
  )
}

export default OutboundTourism