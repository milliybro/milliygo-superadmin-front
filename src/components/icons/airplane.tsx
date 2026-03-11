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
      d="M8.33341 7.91666L4.39617 3.72968C4.04762 3.35372 4.10344 3.07911 4.51449 2.84135C5.2872 2.39439 5.88916 2.38225 6.70365 2.82923L10.7909 5.07226C11.0819 5.23194 11.3672 5.3938 11.6667 5.4821"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.4167 11.386L12.1753 17.0581C12.3189 17.5212 12.5717 17.6052 12.9634 17.3807C13.6997 16.9584 13.9966 16.4708 14.0165 15.5922L14.1163 11.1832C14.1297 10.5942 14.1272 10.0179 14.5834 9.58333"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.94047 9.15356L8.51292 8.00462L12.2031 5.3142C12.2031 5.3142 13.5655 4.31325 14.3267 3.97982C15.2305 3.58387 16.0725 3.76794 16.9783 4.02093C17.4469 4.15179 17.6812 4.21722 17.8503 4.33928C18.1184 4.53296 18.2928 4.83104 18.3287 5.15708C18.3513 5.36256 18.2916 5.59547 18.1722 6.06128C17.9412 6.96188 17.6818 7.77347 16.8824 8.34789C16.2092 8.83164 14.6495 9.49548 14.6495 9.49548L10.4432 11.3037L8.64858 12.073C7.99792 12.3519 7.67258 12.4913 7.45124 12.7501C6.93286 13.3562 6.85965 14.4531 6.66617 15.2078C6.55926 15.6248 5.97298 16.3476 5.45057 16.2391C5.12804 16.1721 5.12186 15.7683 5.08172 15.5109L4.69525 13.0324C4.60283 12.4396 4.59574 12.4276 4.12174 12.0522L2.13972 10.4827C1.93386 10.3196 1.58261 10.1125 1.68508 9.80339C1.85107 9.30273 2.77848 9.16306 3.19797 9.28023C3.95703 9.49223 4.95631 9.97814 5.74745 9.83814C6.08525 9.77839 6.37033 9.57014 6.94047 9.15356Z"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default function AirPlaneIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
