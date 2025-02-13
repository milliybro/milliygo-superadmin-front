import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import useHotelModalStore from '../store/hotel-modal-store'

import AddIcon from '@/components/icons/add'
import HotelsTable from '../containers/hotels-table'
import HotelsFilters from '../containers/hotels-filters'
import HotelsModal from '../components/hotel-modal'
import { getHotelsList } from '../api'
import { useQuery } from '@tanstack/react-query'

const Complaints = () => {
  const { t } = useTranslation()

  const { openModal } = useHotelModalStore(store => store)
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [status, setStatus] = useState(null)

  console.log(setPageSize)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.hotels'), href: ROUTE_PATHS.HOTELS },
    ])
  }, [])
  const { data, isLoading } = useQuery({
    queryKey: ['hotels-data', currentPage, name, username, fullName, status],
    queryFn: async () => {
      const res = await getHotelsList({
        page_size: pageSize,
        page: currentPage,
        placement_name: name,
        username: username,
        full_name: fullName,
        status: status,
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
        <Button
          className="inline-flex items-center gap-2"
          type="primary"
          onClick={openModal}
        >
          <AddIcon /> {t('hotels-page.add-hotel')}
        </Button>
      </div>
      <HotelsModal />
      <HotelsFilters
        setName={setName}
        setUsername={setUsername}
        setFullName={setFullName}
        setStatus={setStatus}
      />
      <HotelsTable
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
