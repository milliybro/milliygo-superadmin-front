import { Typography } from 'antd'

import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const EventsTitle: FC<IEvent> = props => {
  const image = props.images?.find(img => img?.image)

  return (
    <div className="flex items-center gap-4">
      <div className="size-[52px] shrink-0 overflow-hidden rounded-2xl bg-secondary-light">
        {image && (
          <img
            src={image?.image}
            alt={props?.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <Typography.Text className="line-clamp-2 break-all text-sm font-medium">
        {props?.name}
      </Typography.Text>
    </div>
  )
}

export default EventsTitle
