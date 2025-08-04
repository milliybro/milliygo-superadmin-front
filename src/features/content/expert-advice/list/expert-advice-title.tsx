import { Typography } from 'antd'

import type { FC } from 'react'
import type { IExpertAdvice } from '@/features/content/types'

const ExpertAdviceTitle: FC<IExpertAdvice> = props => {
  const image = props.images?.find(img => img.is_main || img.image_path)

  return (
    <div className="flex items-center gap-4">
      <div className="size-[52px] shrink-0 overflow-hidden rounded-2xl bg-secondary-light">
        {image && (
          <img
            src={image.image_path}
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

export default ExpertAdviceTitle
