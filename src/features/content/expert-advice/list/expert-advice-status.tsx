import { Switch } from 'antd'

import type { FC } from 'react'
import type { IExpertAdvice } from '@/features/content/types'

const ExpertAdviceStatus: FC<IExpertAdvice> = props => {
  return (
    <Switch
    // checked={record?.status === 'active'}
    // onChange={value => handleStatusToggle(record.id, value)}
    />
  )
}

export default ExpertAdviceStatus
