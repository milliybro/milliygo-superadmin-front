import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ComplaintsTable from '../containers/complaints-table'
import ComplaintsFilters from '../containers/complaints-filters'
// import NoComplaintsFound from '../components/no-complaints-found'

const Complaints = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.complaints'), href: ROUTE_PATHS.COMPLAINTS },
    ])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="text-[24px] text-primary-dark font-semibold">
        {t('complaints-page.title')}
      </div>
      <ComplaintsFilters />
      <div className="bg-white border flex-col overflow-hidden px-6 border-border rounded-[16px] flex items-center justify-center h-full">
        <ComplaintsTable />
        {/* <NoComplaintsFound /> */}
      </div>
    </div>
  )
}

export default Complaints
