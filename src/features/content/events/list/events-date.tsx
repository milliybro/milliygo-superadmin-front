import dayjs from 'dayjs'
import { Typography } from 'antd'

import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const EventsDate: FC<IEvent> = props => {
  return (
    <Typography.Text className="line-clamp-2 text-sm font-medium">
      {props?.date ? dayjs(props?.date).format('DD MMM, YYYY') : ''}
    </Typography.Text>
  )
}

export default EventsDate
