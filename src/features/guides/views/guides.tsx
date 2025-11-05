import { ROUTE_PATHS } from '@/config/constants'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import GuidesTab from '../containers/guides-tabs'
import GuideProvider from '../context/guide-context'

const Guides = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('guides.guides'), href: ROUTE_PATHS.GUIDES },
    ])
  }, [])

  return (
    <GuideProvider>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex items-start justify-between">
          <div className="text-2xl font-semibold text-primary-dark">
            {t('guides.guides')}
          </div>
        </div>
        <GuidesTab />
      </div>
    </GuideProvider>
  )
}

export default Guides
