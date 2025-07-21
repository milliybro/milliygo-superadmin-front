import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Avatar, Card, Typography } from 'antd'

import type { FC, JSXElementConstructor, SVGProps } from 'react'

import { ru } from 'date-fns/locale/ru'
import { uz } from 'date-fns/locale/uz'
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
      <div className="flex flex-col w-full">
        <div className="flex items-start justify-between gap-[10px] mb-4">
          <Text className="text-medium text-success">{title}</Text>
          <Avatar
            size={48}
            shape="square"
            className="bg-[#F8FAFC] shrink-0 text-primary-dark dark:bg-white/5 dark:text-white rounded-lg"
            icon={<TrendingUpIcon className="text-[24px]" />}
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Text className="text-[32px] font-bold text-primary-dark dark:text-white">
              {value}
            </Text>
            {out_of || out_of === 0 ? (
              <Text className="text-success">/</Text>
            ) : null}
            <Text className="text-[32px] font-bold text-primary-dark">
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
                    'text-[20px]',
                    props?.direction === 'down' ? 'rotate-180' : '',
                  )}
                />
                <Text className="text-inherit whitespace-nowrap font-medium">
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
