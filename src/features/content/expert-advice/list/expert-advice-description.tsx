import { Typography } from 'antd'

import type { FC } from 'react'
import type { IExpertAdvice } from '@/features/content/types'

const ExpertAdviceDescription: FC<IExpertAdvice> = props => {
  return (
    <Typography.Text className="line-clamp-2 text-sm font-medium">
      {props?.description}
    </Typography.Text>
  )
}

export default ExpertAdviceDescription
