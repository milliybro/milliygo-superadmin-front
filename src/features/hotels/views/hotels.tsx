import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getHotelsList } from '../api'
import HotelsModal from '../components/hotel-modal'
import HotelsFilters from '../containers/hotels-filters'
import HotelsTab from '../containers/hotels-tabs'

const Complaints = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const pageSize = 10

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.hotels'), href: ROUTE_PATHS.HOTELS },
    ])
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('hotel_search') || ''
  const username = searchParams.get('login') || ''
  const fullName = searchParams.get('contact_person') || ''
  const status = searchParams.get('status') || ''
  const type = searchParams.get('tab') || '1'
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching } = useQuery({
    queryKey: [
      'hotels-data',
      currentPage,
      name,
      username,
      fullName,
      status,
      type,
    ],
    queryFn: async () => {
      const res = await getHotelsList({
        page_size: pageSize,
        page: currentPage,
        placement_name: name || undefined,
        username: username || undefined,
        full_name: fullName || undefined,
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
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.hotels')}
        </div>
        {/* <Button
          className="inline-flex items-center gap-2"
          type="primary"
          onClick={openModal}
        >
          <AddIcon /> {t('hotels-page.add-hotel')}
        </Button> */}
      </div>
      <HotelsModal />
      <HotelsFilters />
      <HotelsTab
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

export default Complaints
