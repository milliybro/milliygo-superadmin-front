import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getApartmentsList } from '../api'
import LandlordsTable from '../containers/landlords-table'
import LandlordsHeader from '../containers/landlords-header'

const LandLords = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const pageSize = 10

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.landlords'), href: ROUTE_PATHS.LANDLORDS },
    ])
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()

  const status = searchParams.get('status') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching } = useQuery({
    queryKey: ['apartments-list', currentPage, status],
    queryFn: async () => {
      const res = await getApartmentsList({
        page_size: pageSize,
        page: currentPage,
      })
      return res
    },
    placeholderData: data => data,
  })
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* <HotelsModal /> */}
      <LandlordsHeader />
      <LandlordsTable
        ApartmentsData={data}
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

export default LandLords
