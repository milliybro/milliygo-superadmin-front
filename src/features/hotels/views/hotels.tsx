import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import useHotelModalStore from '../store/hotel-modal-store'

import AddIcon from '@/components/icons/add'
import HotelsFilters from '../containers/hotels-filters'
import HotelsModal from '../components/hotel-modal'
import { getHotelsList } from '../api'
import { useQuery } from '@tanstack/react-query'
import HotelsTab from '../containers/hotels-tabs'
import { useSearchParams } from 'react-router'

const Complaints = () => {
  const { t } = useTranslation()

  const { openModal } = useHotelModalStore(store => store)
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  console.log(setPageSize)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.hotels'), href: ROUTE_PATHS.HOTELS },
    ])
  }, [])
  const [searchParams] = useSearchParams()

  const name = searchParams.get('hotel_search') || ''
  const username = searchParams.get('login') || ''
  const fullName = searchParams.get('contact_person') || ''
  const status = searchParams.get('status') || ''
  const type = searchParams.get('tab') || '1'

  useEffect(() => {
    setCurrentPage(1)
  }, [name, username, fullName])
  const { data, isLoading } = useQuery({
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
    // keepPreviousData: true,
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
        isLoading={isLoading}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Complaints
