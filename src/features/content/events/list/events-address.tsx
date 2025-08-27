import { Typography } from 'antd'

import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const EventsAddress: FC<IEvent> = props => {
  return (
    <Typography.Text className="line-clamp-2 break-all text-sm font-medium">
      {props?.location}
    </Typography.Text>
  )
}

export default EventsAddress
