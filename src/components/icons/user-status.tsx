import type { FC, SVGProps } from 'react'

const UserStatusIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.66683 15.1334C8.44756 15.1552 8.22516 15.1663 8.00016 15.1663C4.31826 15.1663 1.3335 12.1816 1.3335 8.49967C1.3335 4.81778 4.31826 1.83301 8.00016 1.83301C11.6821 1.83301 14.6668 4.81778 14.6668 8.49967C14.6668 8.72467 14.6557 8.94707 14.6339 9.16634"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M5 11.8327C5.93498 10.8534 7.34746 10.4354 8.66667 10.6287M9.6634 6.83268C9.6634 7.75316 8.91614 8.49935 7.99435 8.49935C7.07257 8.49935 6.32531 7.75316 6.32531 6.83268C6.32531 5.91221 7.07257 5.16602 7.99435 5.16602C8.91614 5.16602 9.6634 5.91221 9.6634 6.83268Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle
      cx="12.3333"
      cy="12.8333"
      r="2.33333"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
)

export default UserStatusIcon
