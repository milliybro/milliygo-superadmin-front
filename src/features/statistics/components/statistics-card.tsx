import { Avatar, Card, Typography } from 'antd'
import { twMerge } from 'tailwind-merge'

import type { FC, JSXElementConstructor, SVGProps } from 'react'

import TrendingUpIcon from '@/components/icons/trending-up'
import { formatAmount } from '@/helpers/format-amount'
import TrendingDownIcon from '@/components/icons/trending-down'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

interface IProps {
  title: string
  icon?: JSXElementConstructor<SVGProps<SVGSVGElement>>
  value?: number | undefined
  unit?: string
  out_of?: string | number
  className?: string
  direction?: 'down' | 'up' | 'equal'
  change?: number
  yesterday_date?: string
  last_month?: number
  last_year?: string
  isSmall?: boolean
}

const StatisticsCard: FC<IProps> = props => {
  const { title, value, unit, out_of } = props
  const { t } = useTranslation()
  const Icon = props.icon
  return (
    // <Card classNames={{ body: 'w-[380px]' }}>
    <Card className={props?.className} classNames={{ body: 'flex h-full p-4' }}>
      <div className="flex w-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-[10px]">
          <Text
            className={`text-medium text-[14px] text-[#2563EB] ${props?.isSmall ? 'w-full' : 'max-w-[215px]'}`}
          >
            {title}
          </Text>
          {Icon ? (
            <Avatar
              size={48}
              shape="square"
              className="shrink-0 rounded-lg bg-[#F8FAFC] text-primary-dark dark:bg-white/5 dark:text-white"
              icon={<Icon className="text-2xl" />}
            />
          ) : null}
        </div>
        <div className="flex-1"></div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Text className="pb-2 text-[2rem] font-bold text-primary-dark dark:text-white">
              {value ? formatAmount(value) : 0}
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
                  'flex items-center gap-1 text-[14px]',
                  props?.direction === 'down' ? 'text-danger' : 'text-success',
                )}
              >
                {props?.direction === 'down' ? (
                  <TrendingDownIcon className={twMerge('text-xl')} />
                ) : (
                  <TrendingUpIcon className={twMerge('text-xl')} />
                )}
                <Text className="whitespace-nowrap font-medium text-inherit">
                  {props?.change}%
                </Text>
              </Text>
              {props?.yesterday_date ? (
                <Text className="text-[14px] font-[400] text-success">
                  чем вчера (13.02.2024)
                </Text>
              ) : null}
              {props?.last_month ? (
                <Text className="text-success">
                  чем в прошлом месяце (Март)
                </Text>
              ) : null}
              {props?.last_year ? (
                <Text className="text-[14px] font-[400] text-secondary">
                  {t('statistics.than_last_year', { year: props?.last_year })}
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
