import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AccessRoleTable from '../containers/access-role-table'
import AccessRoleFilters from '../containers/access-role-filters'

import AddIcon from '@/components/icons/add'
import { useQuery } from '@tanstack/react-query'
import { getAccessRoles } from '../api'

const AccessRole = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.access-role'), href: ROUTE_PATHS.ACCESS_ROLE },
    ])
  }, [])
  useEffect(() => {
    setCurrentPage(1)
  }, [searchParams])
  const search = searchParams.get('roles_search') || ''

  const { data: AccessRoles } = useQuery({
    queryKey: ['access-roles', currentPage, search, status],
    queryFn: async () => {
      const res = await getAccessRoles({
        page_size: pageSize,
        page: currentPage,
        search: search,
        is_active: status,
      })
      return res
    },
    placeholderData: data => data,
  })

  console.log(AccessRoles)

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.access-role')}
        </div>
        <Button
          className="inline-flex items-center gap-2"
          type="primary"
          onClick={() => navigate(pathname + '/create')}
        >
          <AddIcon /> {t('access-role-page.add-role')}
        </Button>
      </div>
      <AccessRoleFilters />
      <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
        <AccessRoleTable
          data={AccessRoles}
          currentPage={currentPage}
          setCurrentpage={setCurrentPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}

export default AccessRole
