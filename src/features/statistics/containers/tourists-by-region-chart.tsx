import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'

const touristStatistics = {
  total: 45678,
  results: [
    { country: 'Russia', percent: 25 },
    { country: 'Kazakhstan', percent: 20 },
    { country: 'Turkey', percent: 15 },
    { country: 'Germany', percent: 10 },
    { country: 'Kyrgyzstan', percent: 8 },
    { country: 'USA', percent: 5 },
    { country: 'Other', percent: 17 },
  ],
}

const TouristsByRegionChart: FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <Card className={className} classNames={{ body: '!p-0' }}>
      <div className="flex flex-col sticky top-0 p-4 border-b">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-[20px]">Туристы по стране</h2>
            <span className="text-[14px] text-[#777E90]">
              Последние 30 дней
            </span>
          </div>
          <span className="font-bold text-[20px]">
            {touristStatistics.total}
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-3 max-h-[378px] overflow-auto p-4">
        {touristStatistics.results.map((item, i) => (
          <div key={i} className="grid grid-cols-2">
            <span className="text-primary-dark leading-[130%]">
              {item.country}
            </span>
            <div className="col-span-1 justify-end flex items-center gap-4">
              <div
                className="h-[10px] rounded-[10px] bg-[#2CBE88]"
                style={{ width: `${item.percent}%` }}
              ></div>
              <span className="text-[16px] w-[40px] shrink-0 text-end text-primary-dark font-medium">
                {Math.round(item.percent)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default TouristsByRegionChart
