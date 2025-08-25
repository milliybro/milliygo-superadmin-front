import { Typography } from 'antd'

import type { FC } from 'react'
import type { IInstagramContent } from '@/features/content/types'

const InstagramTitle: FC<IInstagramContent> = props => {
  return (
    <div className="flex items-center gap-4">
      <div className="size-[52px] shrink-0 overflow-hidden rounded-2xl bg-secondary-light">
        {props?.image && (
          <img
            src={props?.image}
            alt={props?.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <Typography.Text className="line-clamp-2 break-all text-sm font-medium">
        {props?.title}
      </Typography.Text>
    </div>
  )
}

export default InstagramTitle
