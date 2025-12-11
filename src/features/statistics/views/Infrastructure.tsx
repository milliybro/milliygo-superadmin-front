import { useEffect, useState } from 'react'
import { DatePicker, Typography, Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

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

  // CARD
  const { data, isLoading: isLoadingCard } = useQuery({
    queryKey: ['infrastructure-card', year],
    queryFn: async () => await getInfrastructureCard({ year }),
    placeholderData: data => data,
    gcTime: 0,
  })

  // CHART 1
  const { data: InfrastructureStatchartData, isLoading: isLoadingChart1 } =
    useQuery({
      queryKey: ['infrastructure-stat-chart-data', activeTab],
      queryFn: async () =>
        await getInfrastructureChart({
          chart: 'recreation_tourist_facilities',
          chart_type: activeTab === 'object' ? 'object' : 'place',
        }),
      placeholderData: data => data,
      gcTime: 0,
    })

  // CHART 2
  const { data: hotelSectorchartData, isLoading: isLoadingChart2 } = useQuery({
    queryKey: ['hotel-sector-chart-data', activeTab2],
    queryFn: async () =>
      await getInfrastructureChart({
        chart: 'hotels_accommodation',
        chart_type: activeTab2 === 'object' ? 'object' : 'place',
        guest: true,
      }),
    placeholderData: data => data,
    gcTime: 0,
  })

  // CHART 3
  const {
    data: InfrastructurePublicPlaceChartData,
    isLoading: isLoadingChart3,
  } = useQuery({
    queryKey: ['infrastructure-stat-public-chart-data', activeTab3],
    queryFn: async () =>
      await getInfrastructureChart({
        chart: 'public_placement',
        chart_type: activeTab3 === 'object' ? 'object' : 'place',
      }),
    placeholderData: data => data,
    gcTime: 0,
  })

  // CHART 4
  const { data: hotelSanatoriumChartData, isLoading: isLoadingChart4 } =
    useQuery({
      queryKey: ['hotel-sanatorium-chart-data', activeTab4],
      queryFn: async () =>
        await getInfrastructureChart({
          chart: 'sanatorium',
          chart_type: activeTab4 === 'object' ? 'object' : 'place',
          guest: true,
        }),
      placeholderData: data => data,
      gcTime: 0,
    })

  // ⛔ UMUMIY LOADING HOLATI
  const isGlobalLoading =
    isLoadingCard ||
    isLoadingChart1 ||
    isLoadingChart2 ||
    isLoadingChart3 ||
    isLoadingChart4

  // 💠 SKELETON KO‘RINISHI
  if (isGlobalLoading) {
    return (
      <div className="p-6">
        <Skeleton active paragraph={{ rows: 5 }} />

        <div className="mt-4 grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton.Button key={i} active block style={{ height: 140 }} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton.Button key={i} active block style={{ height: 350 }} />
          ))}
        </div>
      </div>
    )
  }

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

          <DatePicker
            picker="year"
            size="large"
            value={dayjs().year(year)}
            suffixIcon={<CalendarIcon className="text-lg text-success-dark" />}
            disabledDate={current => current.year() > 2024}
            onChange={value => value && setYear(value.year())}
          />
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
      </div>
    </div>
  )
}

export default StatisticsInfrastructure
