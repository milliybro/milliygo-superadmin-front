import { Card } from 'antd'
import { twMerge } from 'tailwind-merge'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import CustomLineChart from '@/components/ui/chart/custom-line-chart'

const FinanceStatsChart: FC<{ className?: string; data: any }> = ({
  className,
  data,
}) => {
  const { t } = useTranslation()

  if (!data || typeof data !== 'object') {
    return (
      <Card className={twMerge('h-full', className)}>
        <div className="flex h-64 items-center justify-center">
          {t('no-data', "Ma'lumot yo'q")}
        </div>
      </Card>
    )
  }

  return (
    <Card className={twMerge('h-full w-full', className)}>
      <div className="-mb-6">
        <h3 className="text-lg font-semibold">
          {t('statistics.dynamics-of-tourist')}
        </h3>
      </div>
      <CustomLineChart data={data} legend={t('statistics.served-tourist')} />
    </Card>
  )
}

export default FinanceStatsChart
