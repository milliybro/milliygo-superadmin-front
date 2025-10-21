import { useTranslation } from 'react-i18next'

const TravelAgenciesHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-start justify-between">
      <div className="text-2xl font-semibold text-primary-dark">
        {t('routes.travel-agencies')}
      </div>
    </div>
  )
}

export default TravelAgenciesHeader
