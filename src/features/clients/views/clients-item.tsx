import { Avatar, Tabs } from 'antd'
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
import formatDate from '../components/format-date'
import CountryRow from '@/components/ui/country-row'

const ClientsItem = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await getUser({ id: id })
      return res
    },
  })

  // const { data: bookings } = useQuery({
  //   queryKey: ['clients-booking', id],
  //   queryFn: async () => {
  //     const res = await getClientBooking({ id: id })
  //     return res
  //   },
  // })
  const language =
    localStorage.getItem('i18nextLng') === 'oz'
      ? 'uz-latin'
      : localStorage.getItem('i18nextLng') === 'uz'
        ? 'uz-cyrillic'
        : localStorage.getItem('i18nextLng')

  const { data: bookings } = useQuery({
    queryKey: ['clients-booking', id, language],
    queryFn: async () => {
      const res = await getClientBooking({ user_id: id, language })
      return res
    },
    enabled: !!id,
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
        title: data ? `${data?.first_name} ${data?.last_name}` : `-`,
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

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex h-full flex-col gap-6 p-6">
        <div className="text-2xl font-semibold text-primary-dark">
          {data?.first_name} {data?.last_name}
        </div>

        <div className="grid flex-1 grid-cols-12 gap-4">
          <div className="col-span-9 flex flex-col overflow-hidden rounded-[16px] border border-border bg-white">
            <Tabs className="p-6" defaultActiveKey="1" items={items} />
          </div>
          <div className="sticky top-6 col-span-3 flex h-fit flex-col gap-6 overflow-hidden rounded-[16px] border border-border bg-gradient-to-b from-[#14B8A61A] from-0% to-white to-35% p-6">
            <div className="flex flex-col items-center justify-center gap-[14px]">
              {/* <div className="size-[108px] rounded-full border border-border bg-secondary-light" /> */}
              <Avatar size={108} src={defaultUser} alt="user avatar image" />

              <span className="text-lg font-semibold text-primary-dark">
                {data?.first_name} {data?.last_name}
              </span>
              {data?.passport_sn ? (
                <div className="flex items-center gap-2">
                  <span className="shrink-0 rounded-[6px] bg-primary-light px-[10px] py-[6px] text-xs font-medium text-primary">
                    {data?.passport_sn}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <section>
                <h2 className="mb-4 text-sm font-semibold text-primary-dark">
                  {t('common.general-information')}
                </h2>
                <div className="space-y-3">
                  <CountryRow
                    label={t('fields.citizenship.label')}
                    value={data?.country_name}
                  />
                  <InfoRow label={t('common.email')} value={data?.email} />
                  <InfoRow
                    label={t('fields.birthdate.label')}
                    value={formatDate(data?.birth_date)}
                  />
                  <InfoRow
                    label={t('fields.gender.label')}
                    value={
                      data?.gender === 'male'
                        ? t('common.men')
                        : data?.gender === 'man'
                          ? t('common.men')
                          : t('common.women')
                    }
                  />
                  <InfoRow
                    label={t('fields.phone.label')}
                    value={data?.phone}
                  />
                </div>
              </section>
              {/* <Divider className="border-border" />
              <section>
                <h2 className="text-sm text-primary-dark font-semibold mb-4">
                  {t('common.additional')}
                </h2>
                <div className="space-y-3">
                  <InfoRow label={t('fields.entry-date.label')} value="-" />
                  <InfoRow label={t('fields.exit-date.label')} value="-" />
                </div>
              </section> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientsItem
