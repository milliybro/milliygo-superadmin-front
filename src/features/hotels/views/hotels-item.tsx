import { Tabs } from 'antd'
import { Divider } from 'antd'
import { useEffect } from 'react'
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

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'common.hotel-content',
    children: <HotelsItemContent />,
  },
  {
    key: '2',
    label: 'common.reviews',
    children: <HotelsItemReviews />,
  },
  {
    key: '3',
    label: 'common.rooms',
    disabled: true,
  },
  {
    key: '4',
    label: 'common.guests',
    disabled: true,
  },
]

const HotelsItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.hotels'), href: ROUTE_PATHS.HOTELS },
      { title: 'Hyatt Regency Tashkent' },
    ])
  }, [])

  return (
    <div className="overflow-y-auto">
      <div className="p-6 flex flex-col gap-6 flex-1">
        <div className="text-[24px] text-primary-dark font-semibold">
          Hyatt Regency Tashkent
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
              <div className="size-[108px] rounded-[8px] border border-border bg-secondary-light" />
              <span className="text-[18px] text-primary-dark font-semibold">
                Hyatt Regency Tashkent
              </span>
              <div className="flex items-center gap-2">
                <StatusTag active />
                <RatingTag value={8.9} icon />
              </div>
            </div>
            <div className="flex flex-col">
              <section>
                <h2 className="text-[14px] text-primary-dark font-semibold mb-4">
                  {t('common.general-information')}
                </h2>
                <div className="space-y-3">
                  <InfoRow label={t('fields.price.label')} value="$ 235" />
                  <InfoRow
                    label={t('fields.login.label')}
                    value="crazyfish228"
                  />
                  <InfoRow label={t('fields.password.label')} value="123456" />
                  <InfoRow
                    label={t('fields.contact-person.label')}
                    value="Alisher Makhmudov"
                  />
                </div>
              </section>
              <Divider className="border-border" />
              <section>
                <h2 className="text-[14px] text-primary-dark font-semibold mb-4">
                  {t('fields.balance.label')}
                </h2>
                <div className="space-y-3">
                  <InfoRow
                    label={t('common.bank-account')}
                    value="40817 810 0100 00012345"
                  />
                  <InfoRow label={t('common.bank-code')} value="55829" />
                  <InfoRow label={t('common.tin')} value="123 456 789" />
                  <InfoRow
                    label={t('common.bank-name')}
                    value="Orient Invest Bank"
                  />
                  <InfoRow
                    label={t('fields.balance.label')}
                    value="514 350 000 UZS"
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
                    value="19 ноября, 2023"
                  />
                  <InfoRow
                    label={t('common.expiration-date')}
                    value="21 ноября, 2025"
                  />
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
