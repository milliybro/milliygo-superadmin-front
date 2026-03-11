import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import TravelAgenciesHeader from '../containers/travel-agencies-header'

import AgentsFilters from '../containers/travel-agencies-filters'
import TravelAgenciesTable from '../containers/travel-agencies-table'

const TravelAgencies = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.travel-agencies'), href: ROUTE_PATHS.PLACEMENTS },
    ])
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <TravelAgenciesHeader />
      <div className="flex h-full w-full flex-col gap-6 overflow-hidden rounded-[16px] border border-border bg-white p-6">
        <AgentsFilters />
        <TravelAgenciesTable />
      </div>
    </div>
  )
}

export default TravelAgencies
