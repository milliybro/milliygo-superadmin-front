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
      d="M11.6667 15C15.3486 15 18.3333 12.0152 18.3333 8.33333C18.3333 4.65143 15.3486 1.66666 11.6667 1.66666C7.98477 1.66666 5 4.65143 5 8.33333C5 12.0152 7.98477 15 11.6667 15Z"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
    />
    <path
      d="M10.9725 17.474C10.0526 18.0198 8.97858 18.3333 7.83133 18.3333C4.42672 18.3333 1.66675 15.5733 1.66675 12.1687C1.66675 11.0214 1.98014 9.94742 2.52597 9.0275"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
    />
  </svg>
)

export default function CoinsIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
