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
      d="M2.5 10C2.5 7.23572 4.73572 5 7.5 5L6.66667 6.66667"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.5 10C17.5 12.7642 15.2642 15 12.5 15L13.3333 13.3333"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15 7.5H12.5C11.3215 7.5 10.7322 7.5 10.3661 7.13388C10 6.76777 10 6.17851 10 5C10 3.82149 10 3.23223 10.3661 2.86612C10.7322 2.5 11.3215 2.5 12.5 2.5H15C16.1785 2.5 16.7677 2.5 17.1339 2.86612C17.5 3.23223 17.5 3.82149 17.5 5C17.5 6.17851 17.5 6.76777 17.1339 7.13388C16.7677 7.5 16.1785 7.5 15 7.5Z"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.5 17.5H5C3.82149 17.5 3.23223 17.5 2.86612 17.1339C2.5 16.7677 2.5 16.1785 2.5 15C2.5 13.8215 2.5 13.2322 2.86612 12.8661C3.23223 12.5 3.82149 12.5 5 12.5H7.5C8.6785 12.5 9.26775 12.5 9.63392 12.8661C10 13.2322 10 13.8215 10 15C10 16.1785 10 16.7677 9.63392 17.1339C9.26775 17.5 8.6785 17.5 7.5 17.5Z"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.75 5H13.7574"
      stroke="currentColor"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.25 15H6.25748"
      stroke="currentColor"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default function MoneyExchangeIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
