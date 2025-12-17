import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import StatisticsCard from '../statistics-card'

import BuildingIcon from '@/components/icons/building-icon'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import LocationUserIcon from '@/components/icons/location-user'

const StatisticsUMehmonStatistics = ({ data }: any) => {
  const { t } = useTranslation()
  const formattedStats = useMemo(() => {
    return [
      {
        icon: BuildingIcon,
        title: t('statistics.user-regis-system'),
        value: data?.placement_count === null ? 0 : data?.placement_count,
        // direction:
        //   data?.placement_count?.yoy_change > 0
        //     ? 'up'
        //     : data?.placement_count?.yoy_change < 0
        //       ? 'down'
        //       : 'neutral',
        // change: data?.placement_count?.yoy_change,
        // last_year: data?.placement_count?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: CheckmarkCircleIcon,

        title: t('statistics.total-bookings'),
        value: data?.booking_count === null ? 0 : data?.booking_count,
        // direction:
        //   data?.booking_count?.yoy_change > 0
        //     ? 'up'
        //     : data?.booking_count?.yoy_change < 0
        //       ? 'down'
        //       : 'neutral',
        // change: data?.booking_count?.yoy_change,
        // last_year: data?.booking_count?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: LocationUserIcon,

        title: t('statistics.average-stay'),
        value: data?.average_stay_days === null ? 0 : data?.average_stay_days,
        // direction:
        //   data?.average_stay_days?.yoy_change > 0
        //     ? 'up'
        //     : data?.average_stay_days?.yoy_change < 0
        //       ? 'down'
        //       : 'neutral',
        // change: data?.average_stay_days?.yoy_change,
        // last_year: data?.average_stay_days?.previous_year,
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

export default StatisticsUMehmonStatistics
