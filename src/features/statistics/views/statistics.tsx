import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { Outlet } from 'react-router'

const Statistics = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([])
  }, [])

  return (
    <Outlet />
    // <div className="flex flex-1 flex-col gap-6 p-6">
    //   <div className="flex flex-col gap-4">
    //     <div className="text-2xl font-semibold text-primary-dark">
    //       {t('common.statistics')}
    //     </div>
    //     <div className="flex items-center justify-between">
    //       <Tabs
    //         rootClassName="[&_.ant-tabs-nav]:m-0 [&_.ant-tabs-nav]:w-fit"
    //         items={[
    //           { label: 'По годам', key: 'year' },
    //           { label: 'По месяцам', key: 'month' },
    //           { label: 'По недельный', key: 'week' },
    //         ]}
    //       />
    //       <DatePicker
    //         size="large"
    //         mode="year"
    //         suffixIcon={<CalendarIcon className="text-lg text-success-dark" />}
    //       />
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-4 gap-5">
    //     <StatisticsList />
    //     <TouristsByRegionChart className="col-span-1" />
    //     <FinanceStatsChart className="col-span-3" />
    //     <IncomeByPaymentType />
    //     <MostBookedHotels />
    //     <ActivityByRegion />
    //     <RegionsWithMostBookings />
    //     <MostPopularDestinations />
    //     <MostTimeSpentPages />
    //     <BookingCancelationsTable className="col-span-full" />
    //   </div>
    //   {/* <div className="flex-1 col-span-9 flex items-center justify-center bg-white border flex-col overflow-hidden border-border rounded-[16px]">
    //     <div className="flex flex-col justify-center gap-3 items-center">
    //       <NotFoundIcon />
    //     </div>
    //     <span className="text-2xl font-semibold text-primary-dark">
    //       {t('complaints-page.not-found-title')}
    //     </span>
    //   </div> */}
    // </div>
  )
}

export default Statistics
