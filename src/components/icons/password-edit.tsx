import Icon, {
  CustomIconComponentProps,
} from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 18 19"
      fill="none"
    >
      <path
        d="M10.0562 13.1348C10.0562 13.1348 10.5249 13.1348 10.9937 14.1348C10.9937 14.1348 12.4826 11.6348 13.8062 11.1348"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.7075 5.88477H12.715"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.95752 5.88477H8.96502"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.20752 5.88477H5.215"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.91895 9.61028H3.75634C2.5102 9.61028 1.5 8.60295 1.5 7.36029V4.38281C1.5 3.14017 2.5102 2.13281 3.75634 2.13281H14.2437C15.4898 2.13281 16.5 3.14017 16.5 4.38281V7.48099"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.4999 12.6348C16.4999 10.1495 14.4795 8.13477 11.9873 8.13477C9.49502 8.13477 7.47461 10.1495 7.47461 12.6348C7.47461 15.12 9.49502 17.1348 11.9873 17.1348C14.4795 17.1348 16.4999 15.12 16.4999 12.6348Z"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
      />
    </svg>
  )
}

export default function ResetPasswordIcon(
  props: Partial<CustomIconComponentProps>,
): ReactElement {
  return <Icon component={icon} {...props} />
}
