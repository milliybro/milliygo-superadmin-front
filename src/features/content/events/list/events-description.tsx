import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const EventsDescription: FC<IEvent> = props => {
  return (
    <div
      className="line-clamp-2 text-sm font-medium"
      dangerouslySetInnerHTML={{
        __html: props?.description,
      }}
    />
  )
}

export default EventsDescription
