import { Button } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AccessRoleTable from '../containers/access-role-table'
import AccessRoleFilters from '../containers/access-role-filters'

import AddIcon from '@/components/icons/add'

const AccessRole = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.access-role'), href: ROUTE_PATHS.ACCESS_ROLE },
    ])
  }, [])

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
        <AccessRoleTable />
      </div>
    </div>
  )
}

export default AccessRole
