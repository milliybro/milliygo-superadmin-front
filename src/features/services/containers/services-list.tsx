import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ServicesTable from '../containers/services-table'
const ServicesList = ({
  type,
  data,
  pageSize,
  currentPage,
  setCurrentPage,
  isLoading,
}: {
  type: any
  data: any
  pageSize: number
  currentPage: number
  setCurrentPage: (page: number) => void
  isLoading: boolean
}) => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      {
        title: t('common.facilities-and-services'),
        href: ROUTE_PATHS.SERVICES,
      },
    ])
  }, [])

  return (
    <div className="w-full p-6 flex flex-col gap-6 flex-1">
      <div className="w-full bg-white border flex-col overflow-hidden border-border dark:bg-dark-bg rounded-[16px] flex items-center justify-center h-full">
        <ServicesTable
          isLoading={isLoading}
          data={data}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          type={type}
        />
      </div>
    </div>
  )
}

export default ServicesList
