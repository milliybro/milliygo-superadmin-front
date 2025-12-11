import { useMemo } from 'react'

import StatisticsCard from '../components/statistics-card'
import BuildingIcon from '@/components/icons/building-icon'
import { useTranslation } from 'react-i18next'
import UserMultipleIcon from '@/components/icons/user-multiple'

const StatisticsCompanyStat = ({ data }: any) => {
  const { t } = useTranslation()
  const formattedStats = useMemo(() => {
    return [
      {
        icon: BuildingIcon,
        title: t('statistics.total-organizations'),
        value:
          data?.tour_agencies_number?.value === null
            ? 0
            : data?.tour_agencies_number?.value,
        direction:
          data?.tour_agencies_number?.yoy_change > 0
            ? 'up'
            : data?.tour_agencies_number?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.tour_agencies_number?.yoy_change,
        last_year: data?.tour_agencies_number?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: BuildingIcon,

        title: t('statistics.tourist-org-regis'),
        value:
          data?.tourist_organizations_registered?.value === null
            ? 0
            : data?.tourist_organizations_registered?.value,
        direction:
          data?.tourist_organizations_registered?.yoy_change > 0
            ? 'up'
            : data?.tourist_organizations_registered?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.tourist_organizations_registered?.yoy_change,
        last_year: data?.tourist_organizations_registered?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: UserMultipleIcon,

        title: t('statistics.total-served-tourists'),
        value:
          data?.tour_agencies_service?.value === null
            ? 0
            : data?.tour_agencies_service?.value,
        direction:
          data?.tour_agencies_service?.yoy_change > 0
            ? 'up'
            : data?.tour_agencies_service?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.tour_agencies_service?.yoy_change,
        last_year: data?.tour_agencies_service?.previous_year,
      },
    ]
  }, [data, t])

  return (
    <>
      {formattedStats.map((val, i) => (
        <StatisticsCard
          className=""
          key={`statistics-card-${i}`}
          isSmall={true}
          {...(val as any)}
        />
      ))}
    </>
  )
}

export default StatisticsCompanyStat
