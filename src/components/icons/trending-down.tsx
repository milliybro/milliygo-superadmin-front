import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M18.3333 14.1667L11.25 7.08337L7.08329 11.25L1.66663 5.83337"
      stroke="#EF4444"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.3334 14.1666H18.3334V9.16663"
      stroke="#EF4444"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default function TrendingDownIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
