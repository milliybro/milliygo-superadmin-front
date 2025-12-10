import { useMemo } from 'react'

import BuildingIcon from '@/components/icons/building-icon'
import { useTranslation } from 'react-i18next'
import StatisticsCard from '../statistics-card'

const StatisticsInboundStat = ({ data }: any) => {
  const { t } = useTranslation()
  const formattedStats = useMemo(() => {
    return [
      {
        icon: BuildingIcon,
        title: t('statistics.number-incoming tourists'),
        value:
          data?.foreign_tourists?.value === null
            ? 0
            : data?.foreign_tourists?.value,
        direction:
          data?.foreign_tourists?.yoy_change > 0
            ? 'up'
            : data?.foreign_tourists?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.foreign_tourists?.yoy_change,
        last_year: data?.foreign_tourists?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: BuildingIcon,

        title: t('statistics.number-of-citizens'),
        value:
          data?.citizens_arriving_medical_treatment?.value === null
            ? 0
            : data?.citizens_arriving_medical_treatment?.value,
        direction:
          data?.citizens_arriving_medical_treatment?.yoy_change > 0
            ? 'up'
            : data?.citizens_arriving_medical_treatment?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.citizens_arriving_medical_treatment?.yoy_change,
        last_year: data?.citizens_arriving_medical_treatment?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: BuildingIcon,

        title: t('statistics.number-relatives'),
        value:
          data?.foreign_tourists_for_relatives_men?.value === null
            ? 0
            : data?.foreign_tourists_for_relatives_men?.value,
        direction:
          data?.foreign_tourists_for_relatives_men?.yoy_change > 0
            ? 'up'
            : data?.foreign_tourists_for_relatives_men?.yoy_change < 0
              ? 'down'
              : 'neutral',
        change: data?.foreign_tourists_for_relatives_men?.yoy_change,
        last_year: data?.foreign_tourists_for_relatives_men?.previous_year,
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

export default StatisticsInboundStat
