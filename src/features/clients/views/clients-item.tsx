import { Avatar, Tabs } from 'antd'
import { Divider } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import InfoRow from '@/components/ui/info-row'
import ClientsItemTable from '../containers/clients-item-table'
import ClientsItemBooking from '../containers/clients-item-booking'

import type { TabsProps } from 'antd'
import { getClientBooking, getClientReview, getUser } from '../api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

import defaultUser from '../../../assets/default-user.png'

const ClientsItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser({ id: id })
      return res
    },
  })
  const { id } = useParams()
  console.log(id)

  const { data: bookings } = useQuery({
    queryKey: ['clients-booking', id],
    queryFn: async () => {
      const res = await getClientBooking({ id: id })
      return res
    },
  })
  const { data: reviews } = useQuery({
    queryKey: ['clients-review', id],
    queryFn: async () => {
      const res = await getClientReview({ id: id })
      return res
    },
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.clients'), href: ROUTE_PATHS.CLIENTS },
      {
        title: data
          ? `${data.first_name} ${data.last_name}`
          : t('common.loading'),
      },
    ])
  }, [])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('common.booking'),
      children: <ClientsItemBooking bookings={bookings} />,
    },
    {
      key: '2',
      label: t('common.comments'),
      children: <ClientsItemTable reviews={reviews} />,
    },
  ]
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''
    const date = new Date(dateString)

    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }
  return (
    <div className="overflow-y-auto flex-1">
      <div className="p-6 flex flex-col gap-6 h-full">
        <div className="text-[24px] text-primary-dark font-semibold">
          {data?.first_name} {data?.last_name}
        </div>

        <div className="grid grid-cols-12 gap-4 flex-1">
          <div className="bg-white col-span-9 border flex flex-col overflow-hidden border-border rounded-[16px]">
            <Tabs className="p-6" defaultActiveKey="1" items={items} />
          </div>
          <div className="bg-gradient-to-b from-[#14B8A61A] h-fit sticky top-6 from-0% to-white to-35% gap-6 flex col-span-3 border flex-col p-6 overflow-hidden border-border rounded-[16px]">
            <div className="flex flex-col justify-center items-center gap-[14px]">
              {/* <div className="size-[108px] rounded-full border border-border bg-secondary-light" /> */}
              <Avatar size={108} src={defaultUser} alt="user avatar image" />

              <span className="text-[18px] text-primary-dark font-semibold">
                {data?.first_name} {data?.last_name}
              </span>
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-[12px] font-medium px-[10px] py-[6px] rounded-[6px] text-primary bg-primary-light">
                  {data?.passport_sn}
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
                    value={formatDate(data?.birth_date)}
                  />
                  <InfoRow
                    label={t('fields.gender.label')}
                    value={
                      data?.gender === 'male'
                        ? 'Мужчина'
                        : data?.gender === 'man'
                          ? 'Мужчина'
                          : 'Женщина'
                    }
                  />
                  <InfoRow
                    label={t('fields.phone.label')}
                    value={data?.phone}
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
