import type { FC, SVGProps } from 'react'

const ArrowUpRightIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.125 4.875L4.5 13.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 4.5H13.5V12"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowUpRightIcon
