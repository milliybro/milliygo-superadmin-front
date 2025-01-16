import { Image, Tabs } from 'antd'
import { Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import InfoRow from '@/components/ui/info-row'
import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'

import ArrowUpRightIcon from '@/components/icons/arrow-up-right'

import HotelsItemContent from '../containers/hotels-item-content'
import HotelsItemReviews from '../containers/hotels-item-table'

import type { TabsProps } from 'antd'
import HotelsItemRooms from '../containers/hotels-item-rooms'
import HotelsItemGuest from '../containers/hotels-item-guest'
import HotelsItemTransactions from '../containers/hotels-item-transaction'
import { useQuery } from '@tanstack/react-query'
import { getHotelDetail } from '../api'
import { useParams } from 'react-router'

interface IHotelDetail {
  id: number
  name: string | undefined
  description: string
  rating: number
  status: boolean
  avg_rating: number
  image: string
  min_price: number
  published_at: string
  owner: { first_name: string; last_name: string }
}

const HotelsItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any | null>(null)

  const { data: HotelDetail, isLoading } = useQuery({
    queryKey: ['hotels-detail', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')
      const res = await getHotelDetail({}, Number(id))
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
        { title: data?.name || t('common.unknown') },
      ])
    }
  }, [data, t])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'common.hotel-content',
      children: <HotelsItemContent data={data} />,
    },
    {
      key: '2',
      label: 'common.reviews',
      children: <HotelsItemReviews />,
    },
    {
      key: '3',
      label: 'common.rooms',
      children: <HotelsItemRooms />,
    },
    {
      key: '4',
      label: 'common.guests',
      children: <HotelsItemGuest />,
    },
    {
      key: '5',
      label: 'common.transaction',
      children: <HotelsItemTransactions />,
    },
  ]

  function formatDate(dateString: string) {
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ]

    const date = new Date(dateString)
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month}, ${year}`
  }

  return (
    <div className="overflow-y-auto">
      <div className="p-6 flex flex-col gap-6 flex-1">
        <div className="text-[24px] text-primary-dark font-semibold">
          {data?.name}
        </div>

        {/* <HotelsFilters /> */}
        <div className="grid grid-cols-12 gap-4">
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
          <div className="bg-gradient-to-b from-[#14B8A61A] h-fit sticky top-6 from-0% to-white to-35% gap-6 flex col-span-3 border flex-col p-6 overflow-hidden border-border rounded-[16px]">
            <div className="flex flex-col justify-center items-center gap-[14px]">
              <div className="overflow-hidden size-[108px] rounded-[8px] border border-border bg-secondary-light">
                <Image
                  src={data?.image}
                  alt={data?.name}
                  width={108}
                  height={108}
                />
              </div>
              <span className="text-[18px] text-primary-dark font-semibold">
                {data?.name}
              </span>
              <div className="flex items-center gap-2">
                <StatusTag active={data?.status || false} />
                <RatingTag value={data?.avg_rating || 0} icon />
              </div>
            </div>
            <div className="flex flex-col">
              <section>
                <h2 className="text-[14px] text-primary-dark font-semibold mb-4">
                  {t('common.general-information')}
                </h2>
                <div className="space-y-3">
                  <InfoRow
                    label={t('fields.price.label')}
                    value={`${data?.min_price} UZS`}
                  />
                  <InfoRow label={t('fields.login.label')} value="" />
                  <InfoRow label={t('fields.password.label')} value="" />
                  <InfoRow
                    label={t('fields.contact-person.label')}
                    value={`${data?.owner?.first_name} ${data?.owner?.last_name}`}
                  />
                </div>
              </section>
              <Divider className="border-border" />
              <section>
                <h2 className="text-[14px] text-primary-dark font-semibold mb-4">
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
                    valueClass="text-[16px] font-semibold"
                  />
                </div>
              </section>
              <Divider className="border-border" />
              <section>
                <h2 className="text-[14px] text-primary-dark font-semibold mb-4">
                  {t('common.additional')}
                </h2>
                <div className="space-y-3">
                  <InfoRow
                    label={t('common.certificate')}
                    value={
                      <a
                        href="/certificate1928.pdf"
                        className="text-blue-600 underline inline-flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        certificate1928.pdf
                        <ArrowUpRightIcon className="text-[18px]" />
                      </a>
                    }
                  />
                  <InfoRow
                    label={t('common.issue-date')}
                    value={formatDate(data?.published_at || "")}
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

export default HotelsItem
