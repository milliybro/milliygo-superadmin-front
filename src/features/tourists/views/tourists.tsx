import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'
import { useQuery } from '@tanstack/react-query'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { formatAmount } from '@/helpers/format-amount'
import { truthyObject } from '@/helpers/truthy-object'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { Tabs } from 'antd'
import { useSearchParams } from 'react-router'
import { getTouristsCount, getTouristsList } from '../api'
import TouristDrawer from '../components/tourist-drawer'
import TouristsFilters from '../containers/tourists-filters'
import TouristsTable from '../containers/tourists-table'

const Tourists = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)

  const [searchParams, setSearchParams] = useSearchParams()
  const query = useParsedQuery()

  useEffect(() => {
    if (query.page) {
      setCurrentPage(+query.page || 1)
    }
  }, [query.page])

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.tourists'), href: ROUTE_PATHS.TOURISTS },
    ])
  }, [])

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
    queryKey: ['tourists-data', currentPage, query, searchParams],
    queryFn: async () => {
      const res = await getTouristsList(
        truthyObject({
          page_size: 10,
          page: currentPage,
          ...query,
        }),
      )
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
        label: `${t('tourists.all-tourists')} • ${formatAmount(touristsCount?.total_count)}`,
        key: '',
      },
      {
        label: `${t('tourists.local-tourists')} • ${formatAmount(touristsCount?.resident_count)}`,
        key: 'resident',
      },
      {
        label: `${t('tourists.foreign-tourists')} • ${formatAmount(touristsCount?.no_resident_count)}`,
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
          className="[&_.ant-form-item-label]:font-medium [&_.ant-tabs-tab]:font-medium"
          activeKey={(query?.resident_status as string) || ''}
          items={tabOptions}
          onChange={key => {
            const newParams = new URLSearchParams()
            newParams.set('resident_status', key)
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
