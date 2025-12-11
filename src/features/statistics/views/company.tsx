import { useEffect, useState } from 'react'
import { DatePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import FinanceStatsChart from '../containers/finance-stats-chart'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { ROUTE_PATHS } from '@/config/constants'

import { getCompanyCard, getCompanyChart } from '../api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import StatisticsCompanyStat from '../containers/statistics-company-stat'
import NumberTravelCompanyChart from '../components/Company/number-travel-company'
import NumberToursSoldChart from '../components/Company/number-tours-sold'
import InfrastructureLoader from '../components/InfrastructureLoader'

const StatisticsCompany = () => {
  const { t } = useTranslation()
  const currentYear = dayjs().year() - 1
  const [year, setYear] = useState(currentYear)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.statistics'), href: ROUTE_PATHS.MAIN },
      { title: t('statistics.tourism_company'), href: '' },
    ])
  }, [t])

  const { data, isLoading: isLoadingCard } = useQuery({
    queryKey: ['company-card', year],
    queryFn: async () => {
      const res = await getCompanyCard({ year })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: serviceChartData, isLoading: isLoadingChart1 } = useQuery({
    queryKey: ['company-chart-data'],
    queryFn: async () => {
      const res = await getCompanyChart({
        chart: 'tour_agencies_service',
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: TourAgentChartData, isLoading: isLoadingChart2 } = useQuery({
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

  const { data: NumberAgenciesChartData, isLoading: isLoadingChart3 } =
    useQuery({
      queryKey: ['agency-number-chart-data'],
      queryFn: async () => {
        const res = await getCompanyChart({
          chart: 'tour_agencies_number',
        })
        return res
      },
      placeholderData: data => data,
      gcTime: 0,
    })

  const isGlobalLoading =
    isLoadingCard || isLoadingChart1 || isLoadingChart2 || isLoadingChart3

  if (isGlobalLoading) {
    return (
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center">
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
              {t('statistics.tourism_company')}
            </Typography.Text>
            <Typography.Text className="mt-2 text-[16px] font-[400] text-secondary">
              {t('statistics.company_desc')}
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
        <StatisticsCompanyStat data={data} />
      </div>
      <FinanceStatsChart className="col-span-3" data={serviceChartData} />
      <div className="grid grid-cols-2 gap-4">
        <NumberTravelCompanyChart data={TourAgentChartData} />

        <NumberToursSoldChart data={NumberAgenciesChartData} />
      </div>
    </div>
  )
}

export default StatisticsCompany
