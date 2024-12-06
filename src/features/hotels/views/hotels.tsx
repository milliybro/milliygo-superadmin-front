import { Button } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AddIcon from '@/components/icons/add'
import HotelsTable from '../containers/hotels-table'
import HotelsFilters from '../containers/hotels-filters'

const Complaints = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('common.hotels'), href: ROUTE_PATHS.HOTELS },
    ])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.hotels')}
        </div>
        <Button className="inline-flex items-center gap-2" type="primary">
          <AddIcon /> {t('hotels-page.add-hotel')}
        </Button>
      </div>
      <HotelsFilters />
      <HotelsTable />
    </div>
  )
}

export default Complaints
