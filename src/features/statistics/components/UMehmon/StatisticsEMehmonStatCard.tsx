import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import StatisticsCard from '../statistics-card'
import UserMultipleIcon from '@/components/icons/user-multiple'

import Money2Icon from '@/components/icons/money2-icon'
import MapsIcon from '@/components/icons/maps-icon'

const StatisticsUMehmonStat = ({ data }: any) => {
  const { t } = useTranslation()
  const formattedStats = useMemo(() => {
    return [
      {
        icon: UserMultipleIcon,
        title: t('statistics.total-regis'),
        value: data?.total_users === null ? 0 : data?.total_users,
        // direction:
        //   data?.total_users?.yoy_change > 0
        //     ? 'up'
        //     : data?.total_users?.yoy_change < 0
        //       ? 'down'
        //       : 'neutral',
        // change: data?.total_users?.yoy_change,
        // last_year: data?.total_users?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: Money2Icon,

        title: t('statistics.new-regis'),
        value: data?.recent_users_count === null ? 0 : data?.recent_users_count,
        // direction:
        //   data?.recent_users_count?.yoy_change > 0
        //     ? 'up'
        //     : data?.recent_users_count?.yoy_change < 0
        //       ? 'down'
        //       : 'neutral',
        // change: data?.recent_users_count?.yoy_change,
        // last_year: data?.recent_users_count?.previous_year,
      },
      {
        // icon: BedDoubleIcon,
        icon: MapsIcon,

        title: t('statistics.total-local-regis'),
        value: data?.uzb_users === null ? 0 : data?.uzb_users,
        // direction:
        //   data?.uzb_users?.yoy_change > 0
        //     ? 'up'
        //     : data?.uzb_users?.yoy_change < 0
        //       ? 'down'
        //       : 'neutral',
        // change: data?.uzb_users?.yoy_change,
        // last_year: data?.uzb_users?.previous_year,
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

export default StatisticsUMehmonStat
