import { useTranslation } from 'react-i18next'

const PlacementsHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="text-2xl font-semibold text-primary-dark">
      {t('routes.placement-funds')}
    </div>
  )
}

export default PlacementsHeader
