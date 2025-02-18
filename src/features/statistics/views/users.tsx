import NotFoundIcon from '@/components/icons/not-found'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Statistics = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  useEffect(() => {
    setBreadCrumbs([])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('common.statistics')}
        </div>
      </div>
      <div className="flex-1 col-span-9 flex items-center justify-center bg-white border flex-col overflow-hidden border-border rounded-[16px]">
        <div className="flex flex-col justify-center gap-3 items-center">
          <NotFoundIcon />
        </div>
        <span className="text-[26px] font-semibold text-primary-dark">
          {t('complaints-page.not-found-title')}
        </span>
      </div>
    </div>
  )
}

export default Statistics
