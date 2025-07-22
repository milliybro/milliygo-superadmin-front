import { useEffect } from 'react'
import { DatePicker, Tabs } from 'antd'
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

const Statistics = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-4">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.statistics')}
        </div>
        <div className="flex items-center justify-between">
          <Tabs
            rootClassName="[&_.ant-tabs-nav]:m-0 [&_.ant-tabs-nav]:w-fit"
            items={[
              { label: 'По годам', key: 'year' },
              { label: 'По месяцам', key: 'month' },
              { label: 'По недельный', key: 'week' },
            ]}
          />
          <DatePicker
            size="large"
            mode="year"
            suffixIcon={
              <CalendarIcon className="text-[18px] text-success-dark" />
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatisticsList />
        <TouristsByRegionChart className=" col-span-1" />
        <FinanceStatsChart className="col-span-3" />
        <IncomeByPaymentType />
        <MostBookedHotels />
        <ActivityByRegion />
        <RegionsWithMostBookings />
        <MostPopularDestinations />
        <MostTimeSpentPages />
        <BookingCancelationsTable className=" col-span-full" />
      </div>
      {/* <div className="flex-1 col-span-9 flex items-center justify-center bg-white border flex-col overflow-hidden border-border rounded-[16px]">
        <div className="flex flex-col justify-center gap-3 items-center">
          <NotFoundIcon />
        </div>
        <span className="text-[26px] font-semibold text-primary-dark">
          {t('complaints-page.not-found-title')}
        </span>
      </div> */}
    </div>
  )
}

export default Statistics
