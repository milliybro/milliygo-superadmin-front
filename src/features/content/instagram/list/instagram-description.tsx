import { Typography } from 'antd'

import type { FC } from 'react'
import type { IInstagramContent } from '@/features/content/types'

const InstagramDescription: FC<IInstagramContent> = props => {
  return (
    <Typography.Text className="line-clamp-2 text-sm font-medium">
      {props?.description}
    </Typography.Text>
  )
}

export default InstagramDescription
