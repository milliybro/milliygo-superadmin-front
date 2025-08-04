import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'
import type { IExpertAdvice } from '@/features/content/types'

const ExpertAdviceDescription: FC<IExpertAdvice> = props => {
  const { t } = useTranslation()

  return (
    <Typography.Text className="line-clamp-2 text-sm font-medium">
      {props?.description || t('Нет описания')}
    </Typography.Text>
  )
}

export default ExpertAdviceDescription
