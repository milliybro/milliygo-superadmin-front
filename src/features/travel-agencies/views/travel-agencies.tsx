import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getTourAgentsList } from '../api'

import TravelAgenciesHeader from '../containers/travel-agencies-header'

import TravelAgenciesTable from '../containers/travel-agencies-table'
import AgentsFilters from '../containers/travel-agencies-filters'

const TravelAgencies = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const pageSize = 10

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.travel-agencies'), href: ROUTE_PATHS.PLACEMENTS },
    ])
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const region = searchParams.get('region') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching } = useQuery({
    queryKey: ['tour-agents', currentPage, search, region],
    queryFn: async () => {
      const res = await getTourAgentsList({
        page_size: pageSize,
        page: currentPage,
        address: region ? region : null,
        name: search ? search : null,
      })
      return res
    },
    placeholderData: data => data,
  })
  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <TravelAgenciesHeader />
      <AgentsFilters />
      <TravelAgenciesTable
        AgentsData={data}
        isLoading={isFetching}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={(page: number) => {
          setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('page', String(page))
            return params
          })
        }}
      />
    </div>
  )
}

export default TravelAgencies
