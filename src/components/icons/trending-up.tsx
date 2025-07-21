import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3334 5.83398L11.2501 12.9173L7.08341 8.75065L1.66675 14.1673"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 5.83398H18.3333V10.834"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function TrendingUpIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
