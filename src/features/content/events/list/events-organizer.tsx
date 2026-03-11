import { Typography } from 'antd'

import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const EventsOrganizer: FC<IEvent> = props => {
  return (
    <Typography.Text className="line-clamp-2 text-sm font-medium">
      {props?.organizer}
    </Typography.Text>
  )
}

export default EventsOrganizer
