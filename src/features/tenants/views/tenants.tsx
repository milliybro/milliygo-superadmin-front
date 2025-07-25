import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import useHotelModalStore from '../store/hotel-modal-store'

import AddIcon from '@/components/icons/add'
import TernantsModal from '../components/tenant-modal'
import TernantsFilters from '../containers/ternants-filters'
import TenantsTable from '../containers/ternants-table'
import { useQuery } from '@tanstack/react-query'
import { getTenantsList } from '../api'
import { useSearchParams } from 'react-router'

const Tenants = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 10

  const { openModal } = useHotelModalStore(store => store)
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const [searchParams] = useSearchParams()

  const schema_name__icontains =
    searchParams.get('schema_name__icontains') || ''
  const username__icontains = searchParams.get('username__icontains') || ''
  const is_active = searchParams.get('is_active') || ''

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.tenants'), href: ROUTE_PATHS.TENANTS },
    ])
  }, [])

  const {
    data: tenantsData,
    isFetching: isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      'tenants-data',
      currentPage,
      username__icontains,
      schema_name__icontains,
      is_active,
    ],
    queryFn: async () => {
      const res = await getTenantsList({
        page_size: pageSize,
        page: currentPage,
        schema_name__icontains,
        username__icontains,
        is_active,
      })
      return res
    },
    placeholderData: data => data,
  })

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.tenants')}
        </div>
        <Button
          className="inline-flex items-center gap-2"
          type="primary"
          onClick={openModal}
        >
          <AddIcon /> {t('tenant.add-tenant')}
        </Button>
      </div>
      <TernantsModal refetch={refetch} />
      <TernantsFilters />
      <TenantsTable
        tenantsData={tenantsData}
        refetch={refetch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        pageSize={pageSize}
      />
    </div>
  )
}

export default Tenants
