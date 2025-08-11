import { Typography } from 'antd'

import type { FC } from 'react'
import type { IInstagramContent } from '@/features/content/types'

const InstagramLink: FC<IInstagramContent> = props => {
  if (!props?.url) {
    return null
  }

  return (
    <Typography.Link
      href={props?.url}
      target="_blank"
      rel="noopener noreferrer"
      className="line-clamp-2 text-sm font-medium"
    >
      {props?.url}
    </Typography.Link>
  )
}

export default InstagramLink
