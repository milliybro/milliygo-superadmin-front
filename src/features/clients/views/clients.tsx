import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ClientsTable from '../containers/clients-table'
import ClientsFilters from '../containers/clients-filters'

const Clients = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.clients'), href: ROUTE_PATHS.CLIENTS },
    ])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold">
        {t('common.clients')}
      </div>
      <ClientsFilters />
      <ClientsTable />
    </div>
  )
}

export default Clients
