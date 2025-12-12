import { Typography } from 'antd'
import tiles from '@/assets/tiled-bg.png'

interface CountryStatItemProps {
  name?: string
  percent?: any
}

function CountryStatItem({ name, percent }: CountryStatItemProps) {
  return (
    <>
      <Typography.Text className="w-max capitalize">
        {name?.toLowerCase()}
      </Typography.Text>
      <div className="h-[15px] grow overflow-hidden rounded-full bg-secondary-light p-0.5">
        <div
          className="relative h-full rounded-full bg-[#777E9099]"
          style={{ width: `${percent}%` }}
        >
          <div
            className="absolute inset-0 h-full"
            style={{
              backgroundImage: `url(${tiles})`,
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              opacity: 0.2,
              borderRadius: '8px',
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
