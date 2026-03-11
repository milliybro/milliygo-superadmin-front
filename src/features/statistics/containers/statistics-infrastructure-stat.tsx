import { useMemo } from 'react'

import StatisticsCard from '../components/statistics-card'
import BuildingIcon from '@/components/icons/building-icon'
import { useTranslation } from 'react-i18next'

const StatisticsInfrastructureStat = ({ data }: any) => {
  const { t } = useTranslation()
  const formattedStats = useMemo(() => {
    return [
      {
        icon: BuildingIcon,
        title: t('statistics.total_organizations'),
        value:
          data?.recreation_tourist_facilities_object?.value === null
            ? 0
            : data?.recreation_tourist_facilities_object?.value,
        direction:
          data?.recreation_tourist_facilities_object?.yoy_change > 0
            ? 'up'
            : data?.recreation_tourist_facilities_object?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.recreation_tourist_facilities_object?.yoy_change,
        last_year: data?.recreation_tourist_facilities_object?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: BuildingIcon,

        title: t('statistics.total_hotels'),
        value:
          data?.hotel_and_similar_places?.value === null
            ? 0
            : data?.hotel_and_similar_places?.value,
        direction:
          data?.hotel_and_similar_places?.yoy_change > 0
            ? 'up'
            : data?.hotel_and_similar_places?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.hotel_and_similar_places?.yoy_change,
        last_year: data?.hotel_and_similar_places?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: BuildingIcon,

        title: t('statistics.total_special_accommodation'),
        value:
          data?.specialized_accommodation_facilities?.value === null
            ? 0
            : data?.specialized_accommodation_facilities?.value,
        direction:
          data?.specialized_accommodation_facilities?.yoy_change > 0
            ? 'up'
            : data?.specialized_accommodation_facilities?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.specialized_accommodation_facilities?.yoy_change,
        last_year: data?.specialized_accommodation_facilities?.previous_year,
      },
      {
        // icon: LoginIcon,
        icon: BuildingIcon,

        title: t('statistics.total_collective_accommodation'),
        value:
          data?.public_placement_object?.value === null
            ? 0
            : data?.public_placement_object?.value,
        direction:
          data?.public_placement_object?.yoy_change > 0
            ? 'up'
            : data?.public_placement_object?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.public_placement_object?.yoy_change,
        last_year: data?.public_placement_object?.previous_year,
      },
      {
        // icon: LogoutIcon,
        icon: BuildingIcon,

        title: t('statistics.total_sanatoriums'),
        value:
          data?.sanatorium_places?.value === null
            ? 0
            : data?.sanatorium_places?.value,
        direction:
          data?.sanatorium_places?.yoy_change > 0
            ? 'up'
            : data?.sanatorium_places?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.sanatorium_places?.yoy_change,
        last_year: data?.sanatorium_places?.previous_year,
      },
    ]
  }, [data, t])

  return (
    <>
      {formattedStats.map((val, i) => (
        <StatisticsCard
          className=""
          key={`statistics-card-${i}`}
          {...(val as any)}
        />
      ))}
    </>
  )
}

export default StatisticsInfrastructureStat
