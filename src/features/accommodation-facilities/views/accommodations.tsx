import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AccommodationsFilters from '../containers/accommodations-filters'
// import AccommodationsTable from '../containers/accommodations-table'
import { getHotels } from '@/features/hotels/api'
import { useQuery } from '@tanstack/react-query'
import AccommodationsTab from '../containers/accommodations-tabs'
import { useSearchParams } from 'react-router'
// import UserModal from '../components/user-modal'
// import HotelsTable from '../containers/users-table'
// import UsersFilters from '../containers/users-filters'
// import { useQuery } from '@tanstack/react-query'
// import { getUsersList } from '../api'

const Accommodations = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // const [searchTerm, setSearchTerm] = useState('')
  // const [gender, setGender] = useState('')
  // const [role, setRole] = useState('')
  // const [isActive, setIsActive] = useState(null)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.accommodations'), href: ROUTE_PATHS.ACCOMMODATIONS },
    ])
  }, [])

  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || null
  const status = searchParams.get('status') || null
  const type = searchParams.get('tab') || '1'

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: ['hotels-data', currentPage, type, search, status],
    queryFn: async () => {
      const res = await getHotels({
        page_size: pageSize,
        page: currentPage,
        search,
        status,
        is_approved:
          type === '1'
            ? 'approved'
            : type === '2'
              ? 'new'
              : type === '3'
                ? 'cancelled'
                : type,
        // placement_name: name,
        // username: username,
        // full_name: fullName,
        // status: status,
      })
      return res
    },
    // keepPreviousData: true,
  })

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.accommodations')}
        </div>
      </div>
      <AccommodationsFilters />
      <div className="bg-white border w-full flex-col overflow-hidden border-border dark:bg-dark-bg rounded-[16px] flex items-center justify-center h-full">
        <AccommodationsTab
          hotelsData={data}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default Accommodations
