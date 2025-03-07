import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ClientsTable from '../containers/clients-table'
import ClientsFilters from '../containers/clients-filters'
import { useQuery } from '@tanstack/react-query'
import { getUsersList } from '@/features/users/api'
import { useSearchParams } from 'react-router'

const Clients = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  console.log(setPageSize)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.clients'), href: ROUTE_PATHS.CLIENTS },
    ])
  }, [])

  const [searchParams] = useSearchParams()
  useEffect(() => {
    setCurrentPage(1)
  }, [searchParams])

  const search = searchParams.get('client_search') || ''
  const gender = searchParams.get('gender') || ''
  const country = searchParams.get('country') || ''
  const status = searchParams.get('status') || ''

  const lang = localStorage.getItem('i18nextLng')


  const { data: ClientsData, isLoading } = useQuery({
    queryKey: ['users-data', currentPage, search, gender, country, status, lang],
    queryFn: async () => {
      const res = await getUsersList({
        page_size: pageSize,
        client_or_employee: 'client',
        country: country ? country : null,
        page: currentPage,
        search: search,
        gender: gender || undefined,
        is_active: status,
      })
      return res
    },
    // keepPreviousData: true,
  })

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold">
        {t('common.clients')}
      </div>
      <ClientsFilters />
      <ClientsTable
        clientsData={ClientsData}
        isLoading={isLoading}
        currentPage={currentPage}
        setCurrentpage={setCurrentPage}
        pageSize={pageSize}
      />
    </div>
  )
}

export default Clients
