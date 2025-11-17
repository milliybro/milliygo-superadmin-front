import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'
import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { getTouristsCount, getTouristsList } from '../api'
import { useSearchParams } from 'react-router'
import TouristsFilters from '../containers/tourists-filters'
import TouristsTable from '../containers/tourists-table'
import TouristDrawer from '../components/tourist-drawer'
import { Tabs } from 'antd'
import { formatAmount } from '@/helpers/format-amount'

const Tourists = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const gender = searchParams.get('gender') || ''
  const birthdate = searchParams.get('birthyear') || ''
  const passport = searchParams.get('passport') || ''
  const region = searchParams.get('region') || ''
  const district = searchParams.get('district') || ''
  const activeTab = searchParams.get('type__key')

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.tourists'), href: ROUTE_PATHS.TOURISTS },
    ])
  }, [])

  useEffect(() => {
    if (!activeTab) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('type__key', '')
      setCurrentPage(1)
      setSearchParams(newParams)
    }
  }, [activeTab, searchParams, setSearchParams])

  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const {
    data: TouristsData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      'tourists-data',
      currentPage,
      gender,
      passport,
      birthdate,
      searchParams,
      search,
      region,
      district,
      activeTab,
    ],
    queryFn: async () => {
      const res = await getTouristsList({
        page_size: 10,
        page: currentPage,
        full_name: search || undefined,
        passport_sn: passport || undefined,
        user_information__birth_date: birthdate || undefined,
        gender: gender || undefined,
        is_active: status || undefined,
        user_information__region: region || undefined,
        user_information__district: district || undefined,
        resident_status: activeTab,
      })
      return res
    },
    placeholderData: data => data,
  })

  const { data: touristsCount } = useQuery({
    queryKey: ['tourists-count'],
    queryFn: async () => {
      const res = await getTouristsCount()
      return res
    },
  })

  const tabOptions = useMemo(() => {
    return [
      {
        label: `Все туристы • ${formatAmount(touristsCount?.total_count)}`,
        key: '',
      },
      {
        label: `Местные туристы • ${formatAmount(touristsCount?.resident_count)}`,
        key: 'resident',
      },
      {
        label: `Иностранные туристы • ${formatAmount(touristsCount?.no_resident_count)}`,
        key: 'no_resident',
      },
    ].map(item => ({
      key: item.key,
      label: item?.label,
      children: (
        <div className="flex flex-col gap-6">
          <TouristsFilters />
          <div className="custom-thead m-0 w-full p-0">
            <TouristsTable
              refetch={refetch}
              TouristsData={TouristsData}
              isLoading={isFetching}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              showDrawer={showDrawer}
            />
          </div>
        </div>
      ),
    }))
  }, [
    TouristsData,
    currentPage,
    isFetching,
    refetch,
    touristsCount?.no_resident_count,
    touristsCount?.resident_count,
    touristsCount?.total_count,
  ])

  return (
    <div className="flex flex-1 flex-col gap-2 px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="text-2xl font-semibold text-primary-dark">
          {t('routes.tourists')}
        </div>
      </div>
      <div className="h-full overflow-hidden rounded-[16px] border border-border bg-white p-6 dark:bg-dark-bg">
        <Tabs
          className="[&_.ant-tabs-tab]:font-medium"
          activeKey={activeTab || ''}
          items={tabOptions}
          onChange={key => {
            const newParams = new URLSearchParams(searchParams)
            newParams.set('type__key', key)
            setCurrentPage(1)
            setSearchParams(newParams)
          }}
        />
      </div>
      <TouristDrawer open={open} onClose={onClose} />
    </div>
  )
}

export default Tourists
