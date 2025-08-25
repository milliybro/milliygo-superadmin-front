import { Switch } from 'antd'

import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const EventsStatus: FC<IEvent> = props => {
  return (
    <Switch
    // checked={record?.status === 'active'}
    // onChange={value => handleStatusToggle(record.id, value)}
    />
  )
}

export default EventsStatus
