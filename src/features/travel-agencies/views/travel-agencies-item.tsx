import { Tabs } from 'antd'

import type { TabsProps } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import TravelAgenciesEmployees from '../containers/travel-agencies-employee'
import TravelAgenciesTours from '../containers/travel-agencies-tours'

// interface IHotelDetail {
//   id: number
//   name: string | undefined
//   description: string
//   rating: number
//   status: boolean
//   avg_rating: number
//   image: string
//   min_price: number
//   published_at: string
//   owner: { first_name: string; last_name: string }
// }

const TravelAgenciesItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [searchParams] = useSearchParams()

  const slug = searchParams.get('slug')

  const items: TabsProps['items'] = [
    {
      key: '2',
      label: 'travel-agencies.all-tours',
      children: <TravelAgenciesTours />,
    },
    {
      key: '3',
      label: 'travel-agencies.all-employee',
      children: <TravelAgenciesEmployees />,
    },
  ]

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.travel-agencies'), href: ROUTE_PATHS.TRAVEL_AGENCIES },
      { title: slug as any },
    ])
  }, [])
  return (
    <div className="overflow-y-auto">
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="text-2xl font-semibold text-primary-dark">{slug}</div>

        <div className="gap-4">
          <div className="col-span-9 flex flex-col overflow-hidden rounded-[16px] border border-border bg-white">
            <Tabs
              className="p-6"
              defaultActiveKey="1"
              items={items.map(val => ({
                ...val,
                label: t(val.label as string),
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelAgenciesItem
