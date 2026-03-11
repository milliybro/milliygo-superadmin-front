import NotFoundIcon from '@/components/icons/not-found'
import { useTranslation } from 'react-i18next'

const UsersNotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <NotFoundIcon />
      </div>
      <span className="text-2xl font-semibold text-primary-dark">
        {t('users-page.not-found')}
      </span>
      <span className="text-secondary">{t('users-page.not-found-desc')}</span>
    </div>
  )
}

export default UsersNotFound
