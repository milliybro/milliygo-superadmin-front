import { Switch } from 'antd'

import type { FC } from 'react'
import type { IInstagramContent } from '@/features/content/types'

const InstagramStatus: FC<IInstagramContent> = props => {
  return <Switch checked={props?.is_active} />
}

export default InstagramStatus
