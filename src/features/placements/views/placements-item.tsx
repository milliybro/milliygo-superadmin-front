import { Tabs } from 'antd'
import { Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TabsProps } from 'antd'
import { useParams, useSearchParams } from 'react-router'

import { useQuery } from '@tanstack/react-query'
import { ROUTE_PATHS } from '@/config/constants'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import InfoRow from '@/components/ui/info-row'
import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'
import HotelIcon from '@/components/icons/hotel'
import formatDate from '@/features/clients/components/format-date'

import { getHotelDetail } from '../api'
import PlacementsItemContent from '../containers/placements-item-content'
import PlacementsItemReviews from '../containers/placements-item-table'
import PlacementsItemRooms from '../containers/placements-item-rooms'
import PlacementsItemGuest from '../containers/placements-item-guest'
import PlacementsItemTransactions from '../containers/placements-item-transaction'

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

const PlacementsItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any | null>(null)
  const [searchParams] = useSearchParams()

  const tenant_id = searchParams.get('tenant_id')
  const lang = localStorage.getItem('i18nextLng')

  const { data: HotelDetail } = useQuery({
    queryKey: ['hotels-detail', id, tenant_id, lang],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')
      const res = await getHotelDetail({
        tenant_id,
        id,
        type: tenant_id ? 'management' : 'site',
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
      key: '1',
      label: 'common.hotel-content',
      children: <PlacementsItemContent data={data} />,
    },
    {
      key: '2',
      label: 'common.reviews',
      children: <PlacementsItemReviews data={data?.placement_detail?.id} />,
    },
    {
      key: '3',
      label: 'common.rooms',
      children: <PlacementsItemRooms />,
    },
    {
      key: '4',
      label: 'common.guests',
      children: <PlacementsItemGuest />,
    },
    {
      key: '5',
      label: 'common.transaction',
      children: <PlacementsItemTransactions />,
    },
  ]

  return (
    <div className="overflow-y-auto">
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="text-2xl font-semibold text-primary-dark">
          {data?.placement_detail?.name}
        </div>

        <div className="grid grid-cols-12 gap-4">
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
          <div className="sticky top-6 col-span-3 flex h-fit flex-col gap-6 overflow-hidden rounded-[16px] border border-border bg-gradient-to-b from-[#14B8A61A] from-0% to-white to-35% p-6">
            <div className="flex flex-col items-center justify-center gap-[14px]">
              <div className="size-[108px] overflow-hidden rounded-[8px] border border-border bg-secondary-light">
                {data?.placement_images[0]?.image ? (
                  <img
                    src={data?.placement_images[0]?.image}
                    alt={data?.placement_detail?.name}
                    className="h-[108px] w-[108px] object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <HotelIcon fontSize={48} />
                  </div>
                )}
              </div>
              <span className="text-lg font-semibold text-primary-dark">
                {data?.placement_detail?.name}
              </span>
              <div className="flex items-center gap-2">
                <StatusTag active={data?.placement_detail?.status || false} />
                <RatingTag
                  value={data?.placement_detail?.avg_rating || 0}
                  icon
                />
              </div>
            </div>
            <div className="flex flex-col">
              {/* <section>
                <h2 className="text-sm text-primary-dark font-semibold mb-4">
                  {t('common.general-information')}
                </h2>
                <div className="space-y-3">
                  <InfoRow
                    label={t('fields.price.label')}
                    value={`${data?.placement_detail?.min_price} UZS`}
                  />
                  <InfoRow label={t('fields.login.label')} value="" />
                  <InfoRow label={t('fields.password.label')} value="" />
                  <InfoRow
                    label={t('fields.contact-person.label')}
                    value={`${data?.owner?.first_name ? data?.owner?.first_name : ''} ${data?.owner?.last_name ? data?.owner?.last_name : ''}`}
                  />
                </div>
              </section>
              <Divider className="border-border" /> */}
              <section>
                <h2 className="mb-4 text-sm font-semibold text-primary-dark">
                  {t('fields.balance.label')}
                </h2>
                <div className="space-y-3">
                  <InfoRow label={t('common.bank-account')} value="" />
                  <InfoRow label={t('common.bank-code')} value="" />
                  <InfoRow label={t('common.tin')} value="" />
                  <InfoRow label={t('common.bank-name')} value="" />
                  <InfoRow
                    label={t('fields.balance.label')}
                    value=""
                    valueClass="text-base font-semibold"
                  />
                </div>
              </section>
              <Divider className="border-border" />
              <section>
                <h2 className="mb-4 text-sm font-semibold text-primary-dark">
                  {t('common.additional')}
                </h2>
                <div className="space-y-3">
                  <InfoRow
                    label={t('common.certificate')}
                    value=""
                    // {
                    //   <a
                    //     href="/certificate1928.pdf"
                    //     className="text-blue-600 underline inline-flex items-center gap-1"
                    //     target="_blank"
                    //     rel="noopener noreferrer"
                    //   >
                    //     <ArrowUpRightIcon className="text-lg" />
                    //   </a>
                    // }
                  />
                  <InfoRow
                    label={t('common.issue-date')}
                    value={formatDate(data?.published_at || '')}
                  />
                  <InfoRow label={t('common.expiration-date')} value="" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlacementsItem
