import { useTranslation } from 'react-i18next'

const PlacementsHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-start justify-between">
      <div className="text-2xl font-semibold text-primary-dark">
        {t('routes.placement-funds')}
      </div>
    </div>
  )
}

export default PlacementsHeader
