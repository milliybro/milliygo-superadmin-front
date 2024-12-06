import { Tabs } from 'antd'
import { Divider } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import InfoRow from '@/components/ui/info-row'
import ClientsItemTable from '../containers/clients-item-table'
import ClientsItemBooking from '../containers/clients-item-booking'

import type { TabsProps } from 'antd'

const ClientsItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.clients'), href: ROUTE_PATHS.CLIENTS },
      { title: 'Victor Chernov' },
    ])
  }, [])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('common.booking'),
      children: <ClientsItemBooking />,
    },
    {
      key: '2',
      label: t('common.comments'),
      children: <ClientsItemTable />,
    },
  ]

  return (
    <div className="overflow-y-auto flex-1">
      <div className="p-6 flex flex-col gap-6 h-full">
        <div className="text-[24px] text-primary-dark font-semibold">
          Victor Chernov
        </div>

        <div className="grid grid-cols-12 gap-4 flex-1">
          <div className="bg-white col-span-9 border flex flex-col overflow-hidden border-border rounded-[16px]">
            <Tabs className="p-6" defaultActiveKey="1" items={items} />
          </div>
          <div className="bg-gradient-to-b from-[#14B8A61A] h-fit sticky top-6 from-0% to-white to-35% gap-6 flex col-span-3 border flex-col p-6 overflow-hidden border-border rounded-[16px]">
            <div className="flex flex-col justify-center items-center gap-[14px]">
              <div className="size-[108px] rounded-full border border-border bg-secondary-light" />
              <span className="text-[18px] text-primary-dark font-semibold">
                Victor Chernov
              </span>
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-[12px] font-medium px-[10px] py-[6px] rounded-[6px] text-primary bg-primary-light">
                  AA 849848
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <section>
                <h2 className="text-[14px] text-primary-dark font-semibold mb-4">
                  {t('common.general-information')}
                </h2>
                <div className="space-y-3">
                  <InfoRow
                    label={t('fields.citizenship.label')}
                    value="Голландия"
                  />
                  <InfoRow
                    label={t('fields.nationality.label')}
                    value="Немец"
                  />
                  <InfoRow
                    label={t('fields.birthdate.label')}
                    value="18  января, 1980"
                  />
                  <InfoRow label={t('fields.gender.label')} value="Мужчина" />
                  <InfoRow
                    label={t('fields.phone.label')}
                    value="(702) 555-0122"
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
                    label={t('fields.entry-date.label')}
                    value="19 ноября, 2024"
                  />
                  <InfoRow
                    label={t('fields.exit-date.label')}
                    value="28 ноября, 2024"
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

export default ClientsItem
