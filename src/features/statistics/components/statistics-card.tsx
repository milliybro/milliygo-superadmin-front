import { Avatar, Card, Typography } from 'antd'
import { twMerge } from 'tailwind-merge'

import type { FC, JSXElementConstructor, SVGProps } from 'react'

import TrendingUpIcon from '@/components/icons/trending-up'

const { Text } = Typography

interface IProps {
  title: string
  icon?: JSXElementConstructor<SVGProps<SVGSVGElement>>
  value?: string | number
  unit?: string
  out_of?: string | number
  className?: string
  direction?: 'down' | 'up' | 'equal'
  change?: number
  yesterday_date?: string
  last_month?: number
}

const StatisticsCard: FC<IProps> = props => {
  const { title, value, unit, out_of } = props
  // const { t, i18n } = useTranslation()

  return (
    // <Card classNames={{ body: 'w-[380px]' }}>
    <Card className={props?.className} classNames={{ body: 'flex h-full' }}>
      <div className="flex w-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-[10px]">
          <Text className="text-medium text-success">{title}</Text>
          <Avatar
            size={48}
            shape="square"
            className="shrink-0 rounded-lg bg-[#F8FAFC] text-primary-dark dark:bg-white/5 dark:text-white"
            icon={<TrendingUpIcon className="text-2xl" />}
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Text className="text-[2rem] font-bold text-primary-dark dark:text-white">
              {value}
            </Text>
            {out_of || out_of === 0 ? (
              <Text className="text-success">/</Text>
            ) : null}
            <Text className="text-[2rem] font-bold text-primary-dark">
              {unit || out_of}
            </Text>
          </div>
          {typeof props?.direction !== 'undefined' &&
          props?.direction !== 'equal' ? (
            <div className="flex gap-2">
              <Text
                className={twMerge(
                  'flex items-center gap-1',
                  props?.direction === 'down' ? 'text-danger' : 'text-primary',
                )}
              >
                <TrendingUpIcon
                  className={twMerge(
                    'text-xl',
                    props?.direction === 'down' ? 'rotate-180' : '',
                  )}
                />
                <Text className="whitespace-nowrap font-medium text-inherit">
                  {props?.change}%
                </Text>
              </Text>
              {props?.yesterday_date ? (
                <Text className="text-success">чем вчера (13.02.2024)</Text>
              ) : null}
              {props?.last_month ? (
                <Text className="text-success">
                  чем в прошлом месяце (Март)
                </Text>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

export default StatisticsCard
