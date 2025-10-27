import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'
import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { getTouristsList } from '../api'
import { useSearchParams } from 'react-router'
import TouristsFilters from '../containers/tourists-filters'
import TouristsTable from '../containers/tourists-table'
import TouristDrawer from '../components/tourist-drawer'

const Tourists = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)

  const [searchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const gender = searchParams.get('gender') || ''
  const birthdate = searchParams.get('birthyear') || ''
  const passport = searchParams.get('passport') || ''
  const region = searchParams.get('region') || ''
  const district = searchParams.get('district') || ''

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.tourists'), href: ROUTE_PATHS.TOURISTS },
    ])
  }, [])

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
    ],
    queryFn: async () => {
      const res = await getTouristsList({
        page_size: 10,
        page: currentPage,
        full_name: search || undefined,
        passport_sn: passport || undefined,
        user_information__birth_date: birthdate || undefined,
        user_information__gender: gender || undefined,
        is_active: status || undefined,
        user_information__region: region || undefined,
        user_information__district: district || undefined,
      })
      return res
    },
    placeholderData: data => data,
  })

  return (
    <div className="flex flex-1 flex-col gap-2 px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="text-2xl font-semibold text-primary-dark">
          {t('routes.tourists')}
        </div>
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-6 overflow-hidden rounded-[16px] border border-border bg-white p-6 dark:bg-dark-bg">
        <TouristsFilters />
        <div className='custom-thead p-0 m-0 w-full'>
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
      <TouristDrawer open={open} onClose={onClose} />
    </div>
  )
}

export default Tourists
