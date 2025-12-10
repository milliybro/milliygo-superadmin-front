import { Typography } from 'antd'
// import { getCountryRankStats } from '../api'
import { useTranslation } from 'react-i18next'
import CountryStatItem from './country-item-stat'

function CountryStats({ data }: any) {
  const { t } = useTranslation()
  //   const { data } = useQuery({
  //     queryKey: ['country-stats'],
  //     queryFn: getCountryRankStats,
  //   })

  return (
    <div className="card-shadow space-y-4 rounded-2xl bg-white p-4">
      <Typography.Title level={2} className="text-lg font-semibold">
        {t('statistics.top-country')}
      </Typography.Title>
      <div className="grid grid-cols-[max-content_1fr_max-content] items-center gap-x-4 gap-y-[11.25px] pt-4">
        {data?.map((item: any) => (
          <CountryStatItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}

export default CountryStats
