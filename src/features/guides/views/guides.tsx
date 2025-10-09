import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import TernantsModal from '../components/guide-view-modal'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import GuidesTab from '../containers/guides-tabs'
import { getGuides } from '../api'

const Guides = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 10

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  const [searchParams] = useSearchParams()

  const tab = searchParams.get('tab') || ''

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('guides.guides'), href: ROUTE_PATHS.GUIDES },
    ])
  }, [])

  const {
    data: guidesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['guides-data', currentPage, tab],
    queryFn: async () => {
      const res = await getGuides({
        page_size: pageSize,
        page: currentPage,
        guide_status:
          tab === '2' ? 'in_progress' : tab === '3' ? 'rejected' : 'accepted',
      })
      return res
    },
    // keepPreviousData: true,
  })

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div className="text-2xl font-semibold text-primary-dark">
          {t('guides.guides')}
        </div>
      </div>
      <TernantsModal />
      <GuidesTab
        guidesData={guidesData}
        refetch={refetch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        pageSize={pageSize}
      />
    </div>
  )
}

export default Guides
