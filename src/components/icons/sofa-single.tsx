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
      d="M6.66659 15L5.83325 18.3333M13.3333 15L14.1666 18.3333"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.9999 7.5C13.5807 7.5 13.3333 9.16667 13.3333 9.16667C13.136 9.95567 13.0496 11.7868 12.3621 12.3235C12.1361 12.5 11.8236 12.5 11.1986 12.5H8.80125C8.17625 12.5 7.86378 12.5 7.63772 12.3235C6.95024 11.7868 6.86383 9.95567 6.66659 9.16667C6.66659 9.16667 6.41919 7.5 4.99992 7.5C4.07944 7.5 3.33325 8.24619 3.33325 9.16667C3.33325 9.78358 3.66842 10.3222 4.16659 10.6103L4.48514 12.2883C4.73139 13.5855 4.85452 14.2341 5.31701 14.6171C5.77949 15 6.43966 15 7.75999 15H12.2398C13.5602 15 14.2203 15 14.6828 14.6171C15.1453 14.2341 15.2684 13.5855 15.5147 12.2883L15.8333 10.6103C16.3314 10.3222 16.6666 9.78358 16.6666 9.16667C16.6666 8.24619 15.9204 7.5 14.9999 7.5Z"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.08325 10.4167C7.86057 9.898 8.88167 9.58333 9.99992 9.58333C11.1182 9.58333 12.1393 9.898 12.9166 10.4167"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
    />
    <path
      d="M5.84702 7.5L5.6936 6.42258C5.37852 4.20975 5.22098 3.10333 5.84195 2.385C6.46291 1.66667 7.57692 1.66667 9.80491 1.66667H10.1952C12.4232 1.66667 13.5372 1.66667 14.1582 2.385C14.7792 3.10333 14.6217 4.20975 14.3066 6.42258L14.1532 7.5"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default function SofaSingleIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
