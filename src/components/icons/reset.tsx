import type { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import Icon from '@ant-design/icons/lib/components/Icon'

const icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M17.0833 4.95801H7.91667C4.82227 4.95801 2.5 7.19553 2.5 10.3747"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.91663 15.7917H12.0833C15.1777 15.7917 17.5 13.5542 17.5 10.375"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.4166 2.875C15.4166 2.875 17.5 4.40935 17.5 4.95835C17.5 5.50735 15.4166 7.04167 15.4166 7.04167"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.58332 13.708C4.58332 13.708 2.50001 15.2423 2.5 15.7913C2.49999 16.3403 4.58333 17.8747 4.58333 17.8747"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ResetIcon(
  props: Partial<CustomIconComponentProps>,
): ReactElement {
  return <Icon component={icon} {...props} />
}
