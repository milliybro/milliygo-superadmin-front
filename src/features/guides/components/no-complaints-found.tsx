import NotFoundIcon from '@/components/icons/not-found'
import { useTranslation } from 'react-i18next'

const NoComplaintsFound = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <NotFoundIcon />
      <span className="text-2xl font-semibold text-primary-dark">
        {t('complaints-page.not-found-title')}
      </span>
      <span className="text-secondary">
        {t('complaints-page.not-found-description')}
      </span>
    </div>
  )
}

export default NoComplaintsFound
