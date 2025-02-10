import { useTranslation } from 'react-i18next'

const NoComplaintsFound = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center gap-3 items-center">
      <img
        src="/src/assets/not-found-illustration.svg"
        alt="not found illustration"
        className="size-[180px]"
      />
      <span className="text-[26px] font-semibold text-primary-dark">
        {t('complaints-page.not-found-title')}
      </span>
      <span className="text-secondary">
        {t('complaints-page.not-found-description')}
      </span>
    </div>
  )
}

export default NoComplaintsFound
