import { Tabs } from 'antd'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TabsProps } from 'antd'
import { useParams, useSearchParams } from 'react-router'

import { useQuery } from '@tanstack/react-query'
import { ROUTE_PATHS } from '@/config/constants'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { getHotelDetail } from '../api'

import TravelAgenciesTours from '../containers/travel-agencies-tours'
import TravelAgenciesEmployees from '../containers/travel-agencies-employee'

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
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any | null>(null)
  const [searchParams] = useSearchParams()

  const slug = searchParams.get('slug')
  const lang = localStorage.getItem('i18nextLng')

  const { data: HotelDetail } = useQuery({
    queryKey: ['hotels-detail', id, lang],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')
      const res = await getHotelDetail({
        id,
      })
      return res
    },
    enabled: !!id,
  })

  useEffect(() => {
    if (HotelDetail) {
      setData(HotelDetail as any)
    }
  }, [HotelDetail])

  useEffect(() => {
    if (data) {
      setBreadCrumbs([
        { title: t('common.main'), href: ROUTE_PATHS.MAIN },
        { title: t('common.hotels'), href: ROUTE_PATHS.HOTELS },
        { title: data?.placement_detail?.name ?? t('common.unknown') },
      ])
    }
  }, [data, t])

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
      <div className="p-6 flex flex-col gap-6 flex-1">
        <div className="text-[24px] text-primary-dark font-semibold">
          {slug}
        </div>

        <div className="gap-4">
          <div className="bg-white col-span-9 border flex flex-col overflow-hidden border-border rounded-[16px]">
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
