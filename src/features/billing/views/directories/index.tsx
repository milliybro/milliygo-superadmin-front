import { useTranslation } from 'react-i18next'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { useEffect } from 'react'
import { ROUTE_PATHS } from '@/config/constants'

const Directories = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('routes.billing') },
      { title: t('routes.directories') },
    ])
  }, [setBreadCrumbs, t])

  return (
    <div className="flex flex-col gap-6 p-6">
      <p className="text-2xl font-semibold leading-[100%] text-primary-dark">
        {t('routes.directories')}
      </p>
      {/* <ReportsTab /> */}
    </div>
  )
}

export default Directories
