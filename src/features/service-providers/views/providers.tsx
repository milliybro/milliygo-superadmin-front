import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ProvidersTab from '../containers/providers-tabs'

const Accommodations = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      {
        title: t('routes.service-providers'),
        href: ROUTE_PATHS.SERVICE_PROVIDERS,
      },
    ])
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-semibold text-primary-dark">
            {t('routes.service-providers')}
          </div>
          <div className="text-secondary mt-2">
            Подробная информация о поставщиках услуг.
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white dark:bg-dark-bg">
        <ProvidersTab />
      </div>
    </div>
  )
}

export default Accommodations
