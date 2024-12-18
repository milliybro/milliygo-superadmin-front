import { Button } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AddIcon from '@/components/icons/add'
import ServicesTable from '../containers/services-table'

const Services = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

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
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.facilities-and-services')}
        </div>
        <Button
          className="inline-flex items-center gap-2"
          type="primary"
          onClick={() => navigate(pathname + '/create')}
        >
          <AddIcon /> {t('services-page.add-user')}
        </Button>
      </div>
      <div className="bg-white border flex-col overflow-hidden border-border dark:bg-dark-bg rounded-[16px] flex items-center justify-center h-full">
        <ServicesTable />
      </div>
    </div>
  )
}

export default Services
