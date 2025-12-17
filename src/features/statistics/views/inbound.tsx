import { useEffect, useState } from 'react'
import { Card, DatePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { ROUTE_PATHS } from '@/config/constants'
import {
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
import InfrastructureLoader from '../components/InfrastructureLoader'
import { twMerge } from 'tailwind-merge'
import CustomLineChart from '@/components/ui/chart/custom-line-chart'

const InboundTourism = () => {
  const { t } = useTranslation()
  const currentYear = dayjs().year() - 1
  const [year, setYear] = useState(currentYear)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
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

  const { data, isLoading: isLoadingCard } = useQuery({
    queryKey: ['inbound-card', year],
    queryFn: async () => {
      const res = await getInboundTourismCard({ year })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: inboundPurposeData, isLoading: isLoadingChart1 } = useQuery({
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

  const { data: TopCountry, isLoading: isLoadingChart2 } = useQuery({
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

  const countriesParam = selectedCountries.join(',')

  const { data: museumSalesCountry, isLoading: isLoadingChart3 } = useQuery({
    queryKey: ['museum-sales-country', start_date, end_date, countriesParam],
    queryFn: async () => {
      if (!start_date || !end_date) return null

      const res = await getMuseumSalesCountry({
        start_date,
        end_date,
        countries: countriesParam,
      })

      return res
    },
    enabled: !!start_date && !!end_date,
  })

  const { data: groupCountryTourists, isLoading: isLoadingChart4 } = useQuery({
    queryKey: ['group-country-tourists'],
    queryFn: async () => {
      const res = await getGroupCountryTourists()

      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: inboundChart, isLoading: isLoadingChart5 } = useQuery({
    queryKey: ['inbound-chart'],
    queryFn: async () => {
      const res = await getInboundChart({})
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const isGlobalLoading =
    isLoadingCard ||
    isLoadingChart1 ||
    isLoadingChart2 ||
    // isLoadingChart3 ||
    isLoadingChart4 ||
    isLoadingChart5

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
      <StatisticsOfVisits
        data={museumSalesCountry}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        isLoading={isLoadingChart3}
      />
      <TouristChart data={groupCountryTourists} />
      <Card className={twMerge('h-full w-full')}>
        <div className="-mb-6">
          <h3 className="text-lg font-semibold">
            {t('statistics.growth_dynamics')}
          </h3>
        </div>
        <CustomLineChart
          data={inboundChart}
          legend={t('statistics.foreign_tourists')}
        />
      </Card>
    </div>
  )
}

export default InboundTourism
