import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getHotelsList } from '../api'
import HotelsModal from '../components/hotel-modal'
import PlacementsHeader from '../containers/placement-header'
import PlacementTabs from '../containers/placements-tabs'

const Placements = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const pageSize = 10

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.placement-funds'), href: ROUTE_PATHS.PLACEMENTS },
    ])
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()

  const status = searchParams.get('status') || ''
  const type = searchParams.get('tab') || '1'
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching } = useQuery({
    queryKey: [
      'placements-data',
      currentPage,
      status,
    ],
    queryFn: async () => {
      const res = await getHotelsList({
        page_size: pageSize,
        page: currentPage,
        status: status,
        placement_key:
          type === '1'
            ? 'hotel'
            : type === '3'
              ? 'accommodations'
              : type === '4'
                ? 'hostel'
                : type === '2'
                  ? 'apartment'
                  : type,
      })
      return res
    },
    placeholderData: data => data,
  })
  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <HotelsModal />
      <PlacementsHeader />
      <PlacementTabs
        hotelsData={data}
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

export default Placements
