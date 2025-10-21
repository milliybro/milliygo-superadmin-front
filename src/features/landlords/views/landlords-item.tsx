import { Divider } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { useQuery } from '@tanstack/react-query'
import { ROUTE_PATHS } from '@/config/constants'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import InfoRow from '@/components/ui/info-row'
import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'
import HotelIcon from '@/components/icons/hotel'

import LandlordsItemContent from '../containers/landlords-item-content'

import { getApartmentItem } from '../api'

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

const LandlordsItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any | null>(null)

  const { data: ApartmentDetail } = useQuery({
    queryKey: ['apartment-detail', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')
      const res = await getApartmentItem(id as any)
      return res
    },
    enabled: !!id,
  })

  useEffect(() => {
    if (ApartmentDetail) {
      setData(ApartmentDetail as any)
    }
  }, [ApartmentDetail])

  useEffect(() => {
    if (data) {
      setBreadCrumbs([
        { title: t('common.main'), href: ROUTE_PATHS.MAIN },
        { title: t('common.hotels'), href: ROUTE_PATHS.HOTELS },
        { title: data?.apartment_name ?? t('common.unknown') },
      ])
    }
  }, [data, t])

  return (
    <div className="overflow-y-auto">
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="text-2xl font-semibold text-primary-dark">
          {data?.apartment_name}
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9 flex flex-col overflow-hidden rounded-[16px] border border-border bg-white p-6">
            <LandlordsItemContent data={data} />
          </div>
          <div className="sticky top-6 col-span-3 flex h-fit flex-col gap-6 overflow-hidden rounded-[16px] border border-border bg-gradient-to-b from-[#14B8A61A] from-0% to-white to-35% p-6">
            <div className="flex flex-col items-center justify-center gap-[14px]">
              <div className="size-[108px] overflow-hidden rounded-[8px] border border-border bg-secondary-light">
                {data?.image_url ? (
                  <img
                    src={data?.image_url}
                    alt={data?.apartment_name}
                    className="h-[108px] w-[108px] object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <HotelIcon fontSize={48} />
                  </div>
                )}
              </div>
              <span className="text-lg font-semibold text-primary-dark">
                {data?.apartment_name}
              </span>
              <div className="flex items-center gap-2">
                <StatusTag active={data?.status || false} />
                <RatingTag value={data?.rating || 0} icon />
              </div>
            </div>
            <div className="flex flex-col">
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
                  <InfoRow label={t('common.certificate')} value="" />
                  <InfoRow label={t('common.issue-date')} value="" />
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

export default LandlordsItem
