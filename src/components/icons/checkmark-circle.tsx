import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 12.5L10.5 15L16 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CheckmarkCircleIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
