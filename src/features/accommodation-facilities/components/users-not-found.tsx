import NotFoundIcon from '@/components/icons/not-found'
import { useTranslation } from 'react-i18next'

const UsersNotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full flex text-center flex-col justify-center items-center">
      <div className="flex w-full flex-col justify-center gap-3 items-center">
        <NotFoundIcon />
      </div>
      <span className="text-[26px] font-semibold text-primary-dark">
        {t('users-page.not-found')}
      </span>
      <span className="text-secondary">{t('users-page.not-found-desc')}</span>
    </div>
  )
}

export default UsersNotFound
