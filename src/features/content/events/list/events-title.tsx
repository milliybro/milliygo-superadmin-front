import type { FC } from 'react'
import type { IEvent } from '@/features/content/types'

const EventsTitle: FC<IEvent> = props => {
  return (
    <div className="flex items-center gap-4">
      <div className="size-[52px] shrink-0 overflow-hidden rounded-2xl bg-secondary-light">
        {props?.image && (
          <img
            src={props?.image}
            alt={props?.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div
        className="line-clamp-2 text-sm font-medium"
        dangerouslySetInnerHTML={{
          __html: props?.name,
        }}
      />
    </div>
  )
}

export default EventsTitle
