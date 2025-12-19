import { useEffect, useState } from 'react'
import { Card, DatePicker, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CalendarIcon from '@/components/icons/calendar'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { ROUTE_PATHS } from '@/config/constants'
import { getUMehmonCard, getUMehmonChart, getUMehmonTableRating } from '../api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import InfrastructureLoader from '../components/InfrastructureLoader'
import UMehmonTable from '../components/UMehmon/UMehmonTable'
import StatisticsUMehmonStat from '../components/UMehmon/StatisticsEMehmonStatCard'
import StatisticsUMehmonStatistics from '../components/UMehmon/statistics-umehmon'
import { twMerge } from 'tailwind-merge'
import CustomLineChart from '@/components/ui/chart/custom-line-chart'

const UMehmonActive = () => {
  const { t } = useTranslation()
  const currentYear = dayjs().year()
  const [year, setYear] = useState(currentYear)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.statistics'), href: ROUTE_PATHS.MAIN },
      { title: t('statistics.umehmon-active'), href: '' },
    ])
  }, [t])

  const { data, isLoading: isLoadingCard } = useQuery({
    queryKey: ['umehmon-card', year],
    queryFn: async () => {
      const res = await getUMehmonCard({ year })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: chart, isLoading: isLoadingChart1 } = useQuery({
    queryKey: ['umehmon-chart', year],
    queryFn: async () => {
      const res = await getUMehmonChart({
        year,
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const { data: table, isLoading: isLoadingChart3 } = useQuery({
    queryKey: ['umehmon-table', year],
    queryFn: async () => {
      const res = await getUMehmonTableRating({
        // year,
        page_size: 50,
      })
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  const isGlobalLoading = isLoadingCard || isLoadingChart1 || isLoadingChart3

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
              {t('statistics.umehmon-active')}
            </Typography.Text>
            <Typography.Text className="mt-2 text-[16px] font-[400] text-secondary">
              {t('statistics.umehmon-desc')}
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
              disabledDate={current => current.year() > 2025}
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
        <StatisticsUMehmonStat data={data} />
      </div>
      <Card className={twMerge('h-full w-full')}>
        <div className="-mb-6">
          <h3 className="text-lg font-semibold">
            {t('statistics.regis-statistics')}
          </h3>
        </div>
        <CustomLineChart
          data={chart as any}
          legend={t('statistics.user-regis')}
        />
      </Card>
      <div className="mt-1">
        <Typography.Text className="text-[24px] font-[600]">
          {t('common.booking')}
        </Typography.Text>
        <div className="grid grid-cols-3 gap-4 pt-4">
          <StatisticsUMehmonStatistics data={data} />
        </div>
      </div>
      <UMehmonTable data={table} />
    </div>
  )
}

export default UMehmonActive
