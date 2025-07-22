import { useTranslation } from 'react-i18next'

const TravelAgenciesHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-start justify-between">
      <div className="text-[24px] text-primary-dark font-semibold">
        {t('routes.travel-agencies')}
      </div>
    </div>
  )
}

export default TravelAgenciesHeader
