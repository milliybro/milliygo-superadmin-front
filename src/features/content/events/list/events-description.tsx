import { Typography } from 'antd'

import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const EventsDescription: FC<IEvent> = props => {
  return (
    <Typography.Text className="line-clamp-2 text-sm font-medium">
      {props?.description || 'Нет описания'}
    </Typography.Text>
  )
}

export default EventsDescription
