import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import { getLogs } from '../api'
import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ActionHistoryTable from '../containers/action-history-table'

const ActionHistory = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const search = searchParams.get('roles_search') || ''

  const { data: AccessRoles } = useQuery({
    queryKey: ['access-roles', currentPage, search],
    queryFn: () => getLogs({ page_size: 10, page: currentPage }),
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.action-history'), href: ROUTE_PATHS.ACCESS_ROLE },
    ])
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchParams])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="text-2xl font-semibold text-primary-dark">
        {t('common.action-history')}
      </div>
      <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white">
        <ActionHistoryTable
          data={AccessRoles}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default ActionHistory
