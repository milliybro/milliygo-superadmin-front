import { useEffect, useState } from 'react'
import { DatePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import FinanceStatsChart from '../containers/finance-stats-chart'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { ROUTE_PATHS } from '@/config/constants'

import { getCompanyCard, getCompanyChart, getInfrastructureChart } from '../api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import StatisticsCompanyStat from '../containers/statistics-company-stat'
import NumberTravelCompanyChart from '../components/Company/number-travel-company'
import NumberToursSoldChart from '../components/Company/number-tours-sold'

const StatisticsCompany = () => {
  const { t } = useTranslation()
  const currentYear = dayjs().year() - 1
  const [year, setYear] = useState(currentYear)
  const [activeTab, setActiveTab] = useState<'object' | 'place'>('object')
  const [activeTab2, setActiveTab2] = useState<'object' | 'place'>('object')
  const [activeTab3, setActiveTab3] = useState<'object' | 'place'>('object')
  const [activeTab4, setActiveTab4] = useState<'object' | 'place'>('object')

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.statistics'), href: ROUTE_PATHS.MAIN },
      { title: t('statistics.tourism_company'), href: '' },
    ])
  }, [t])

  const { data } = useQuery({
    queryKey: ['company-card', year],
    queryFn: async () => {
      const res = await getCompanyCard({ year })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: serviceChartData } = useQuery({
    queryKey: ['company-chart-data'],
    queryFn: async () => {
      const res = await getCompanyChart({
        // year,
        chart: 'tour_agencies_service',
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  // chart2
  const { data: TourAgentChartData } = useQuery({
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
  const { data: NumberAgenciesChartData } = useQuery({
    queryKey: ['agency-number-chart-data'],
    queryFn: async () => {
      const res = await getCompanyChart({
        // year,
        chart: 'tour_agencies_number',
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  // chart4
  const { data: hotelSanatoriumChartData } = useQuery({
    queryKey: ['hotel-sanatorium-chart-data', activeTab4],
    queryFn: async () => {
      const res = await getInfrastructureChart({
        // year,
        chart: 'sanatorium',
        chart_type: activeTab4 === 'object' ? 'object' : 'place',
        guest: true,
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

        {/* <TouristsByRegionChart className="col-span-1" /> */}
      </div>
      {/* <IncomeByPaymentType />
        <MostBookedHotels />
        <ActivityByRegion />
        <RegionsWithMostBookings />
        <MostPopularDestinations />
        <MostTimeSpentPages />
        <BookingCancelationsTable className="col-span-full" /> */}
      {/* <div className="flex-1 col-span-9 flex items-center justify-center bg-white border flex-col overflow-hidden border-border rounded-[16px]">
        <div className="flex flex-col justify-center gap-3 items-center">
          <NotFoundIcon />
        </div>
        <span className="text-2xl font-semibold text-primary-dark">
          {t('complaints-page.not-found-title')}
        </span>
      </div> */}
    </div>
  )
}

export default StatisticsCompany
