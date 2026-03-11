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
      d="M4.37796 3.49653L3.35473 4.09011C2.53124 4.56781 2.11949 4.80667 1.89311 5.20403C1.66675 5.60138 1.66675 6.08528 1.66675 7.05307V13.8569C1.66675 15.1285 1.66675 15.7643 1.95196 16.1182C2.14176 16.3537 2.40771 16.5119 2.70175 16.5644C3.14363 16.6433 3.68465 16.3294 4.76664 15.7018C5.50138 15.2755 6.20851 14.8328 7.08747 14.9529C7.4873 15.0075 7.86867 15.1972 8.63141 15.5764L11.8097 17.1567C12.4971 17.4985 12.5034 17.5 13.2679 17.5H15.0001C16.5714 17.5 17.3571 17.5 17.8452 17.0011C18.3334 16.5022 18.3334 15.6991 18.3334 14.0931V8.47625C18.3334 6.87019 18.3334 6.06717 17.8452 5.56824C17.3571 5.0693 16.5714 5.0693 15.0001 5.0693H13.2679C12.5034 5.0693 12.4971 5.06783 11.8097 4.726L9.03333 3.34553C7.87411 2.76914 7.29451 2.48095 6.67706 2.50098C6.05961 2.52101 5.49906 2.84618 4.37796 3.49653Z"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.66675 2.5V14.5833"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 5.41675V17.0834"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default function MapsIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
