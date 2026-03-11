import type { FC, SVGProps } from 'react'

const AlertIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 27 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6.26551 10.49C8.88033 5.86315 10.1877 3.54972 11.9818 2.95421C12.9687 2.62659 14.0319 2.62659 15.0189 2.95421C16.8129 3.54972 18.1203 5.86315 20.7351 10.49C23.35 15.1169 24.6574 17.4303 24.2652 19.3153C24.0494 20.3523 23.5178 21.2929 22.7466 22.0023C21.3448 23.2918 18.73 23.2918 13.5003 23.2918C8.27069 23.2918 5.65588 23.2918 4.25404 22.0023C3.48283 21.2929 2.95125 20.3523 2.73548 19.3153C2.34329 17.4303 3.65069 15.1169 6.26551 10.49Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M13.763 18.4167V14.0833C13.763 13.5726 13.763 13.3173 13.6044 13.1587C13.4457 13 13.1904 13 12.6797 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.492 9.75H13.5017"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default AlertIcon
