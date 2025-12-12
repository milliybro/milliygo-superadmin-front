import { Typography } from 'antd'
import tiles from '@/assets/green-chart.jpg'

interface CountryStatItemProps {
  country?: string
  percent?: any
}

function CountryStatItem({ country, percent }: CountryStatItemProps) {
  return (
    <>
      <Typography.Text className="w-max capitalize">
        {country?.toLowerCase()}
      </Typography.Text>
      <div className="h-[15px] grow overflow-hidden rounded-full bg-secondary-light p-0.5">
        <div
          className="relative h-full rounded-full bg-[#777E90]"
          style={{ width: `${percent}%` }}
        >
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              backgroundImage: `url(${tiles})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              opacity: 0.15,
            }}
          ></div>
        </div>
      </div>
      <Typography.Text className="block font-medium">
        {parseFloat(percent.toFixed(1))}%
      </Typography.Text>
    </>
  )
}

export default CountryStatItem
