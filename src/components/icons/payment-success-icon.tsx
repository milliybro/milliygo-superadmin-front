import type { FC, SVGProps } from 'react'

const PaymentSuccessIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 18.5C14.5 18.5 15.5 18.5 16.5 20.5C16.5 20.5 19.6765 15.5 22.5 14.5"
      stroke="#4DD282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 11.5H5.99102"
      stroke="#4DD282"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 19.5H11C7.24142 19.5 5.36213 19.5 4.10746 18.5091C3.90678 18.3506 3.72119 18.176 3.5528 17.9871C2.5 16.8062 2.5 15.0375 2.5 11.5C2.5 7.96252 2.5 6.19377 3.5528 5.0129C3.72119 4.82403 3.90678 4.64935 4.10746 4.49087C5.36213 3.5 7.24142 3.5 11 3.5H14C17.7586 3.5 19.6379 3.5 20.8925 4.49087C21.0932 4.64935 21.2788 4.82403 21.4472 5.0129C22.3957 6.07684 22.4897 7.61799 22.499 10.5V11"
      stroke="#4DD282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 11.5C15 12.8807 13.8807 14 12.5 14C11.1193 14 10 12.8807 10 11.5C10 10.1193 11.1193 9 12.5 9C13.8807 9 15 10.1193 15 11.5Z"
      stroke="#4DD282"
      strokeWidth="1.5"
    />
  </svg>
)

export default PaymentSuccessIcon
