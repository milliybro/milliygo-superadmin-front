import { useEffect, useState } from 'react'
import { DatePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import FinanceStatsChart from '../containers/finance-stats-chart'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import TouristsByRegionChart from '../containers/tourists-by-region-chart'
import StatisticsList from '../containers/statistics-list'
import BookingCancelationsTable from '../containers/booking-cancelations-table'
import IncomeByPaymentType from '../containers/income-by-payment-type'
import MostBookedHotels from '../containers/most-booked-hotels'
import ActivityByRegion from '../containers/activity-by-region'
import RegionsWithMostBookings from '../containers/regions-with-most-bookings'
import MostPopularDestinations from '../containers/most-popular-destinations'
import MostTimeSpentPages from '../containers/most-time-spent-pages'
import { ROUTE_PATHS } from '@/config/constants'
import StatisticsInfrastructureStat from '../containers/statistics-infrastructure-stat'
import InfrastructureOrganizationChart from '../containers/infrastructure-organization-chart'
import InfrastructureHotelSectorStatistics from '../containers/infrastructure-hotel-sector-stat'
import InfrastructureCollectiveStatistics from '../containers/infrastructure-collective0accommodation'
import InfrastructureSanatoriumStatistics from '../containers/infrastructure-sanatorium-stat'
import { getInfrastructureCard, getInfrastructureChart } from '../api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

const StatisticsInfrastructure = () => {
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
      { title: t('statistics.tourist_infracstructure'), href: '' },
    ])
  }, [t])

  const { data } = useQuery({
    queryKey: ['infrastructure-card', year],
    queryFn: async () => {
      const res = await getInfrastructureCard({ year })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: InfrastructureStatchartData } = useQuery({
    queryKey: ['infrastructure-stat-chart-data', activeTab],
    queryFn: async () => {
      const res = await getInfrastructureChart({
        // year,
        chart: 'recreation_tourist_facilities',
        chart_type: activeTab === 'object' ? 'object' : 'place',
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  // chart2
  const { data: hotelSectorchartData } = useQuery({
    queryKey: ['hotel-sector-chart-data', activeTab2],
    queryFn: async () => {
      const res = await getInfrastructureChart({
        // year,
        chart: 'hotels_accommodation',
        chart_type: activeTab2 === 'object' ? 'object' : 'place',
        guest: true,
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  // chart3
  const { data: InfrastructurePublicPlaceChartData } = useQuery({
    queryKey: ['infrastructure-stat-public-chart-data', activeTab3],
    queryFn: async () => {
      const res = await getInfrastructureChart({
        // year,
        chart: 'public_placement',
        chart_type: activeTab3 === 'object' ? 'object' : 'place',
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
              {t('statistics.tourist_infracstructure')}
            </Typography.Text>
            <Typography.Text className="mt-2 text-[16px] font-[400] text-secondary">
              {t('statistics.tourist_infracstructure-desc')}
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
      <div className="grid grid-cols-5 gap-4">
        <StatisticsInfrastructureStat data={data} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InfrastructureOrganizationChart
          data={InfrastructureStatchartData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <InfrastructureHotelSectorStatistics
          data={hotelSectorchartData}
          activeTab={activeTab2}
          onTabChange={setActiveTab2}
        />
        <InfrastructureCollectiveStatistics
          data={InfrastructurePublicPlaceChartData}
          activeTab={activeTab3}
          onTabChange={setActiveTab3}
        />
        <InfrastructureSanatoriumStatistics
          data={hotelSanatoriumChartData}
          activeTab={activeTab4}
          onTabChange={setActiveTab4}
        />
        {/* <TouristsByRegionChart className="col-span-1" /> */}

        {/* <FinanceStatsChart className="col-span-3" />
        <IncomeByPaymentType />
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
    </div>
  )
}

export default StatisticsInfrastructure
