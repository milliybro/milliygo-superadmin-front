import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ClientsTable from '../containers/clients-table'
import ClientsFilters from '../containers/clients-filters'
import { useQuery } from '@tanstack/react-query'
import { getUsersList } from '@/features/users/api'

const Clients = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [gender, setGender] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [pageSize, setPageSize] = useState(10)

  console.log('SSS', selectedCountry, setPageSize)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.clients'), href: ROUTE_PATHS.CLIENTS },
    ])
  }, [])
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const { data: ClientsData, isLoading } = useQuery({
    queryKey: ['users-data', currentPage, searchTerm, gender, selectedCountry],
    queryFn: async () => {
      const res = await getUsersList({
        page_size: pageSize,
        client_or_employee: 'client',
        country: selectedCountry ? selectedCountry : null,
        page: currentPage,
        search: searchTerm,
        gender: gender || undefined,
        is_active: isActive,
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
      <ClientsFilters
        setSearchTerm={setSearchTerm}
        setIsActive={setIsActive}
        searchTerm={searchTerm}
        gender={gender}
        setGender={setGender}
        setSelectedCountry={setSelectedCountry}
      />
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
