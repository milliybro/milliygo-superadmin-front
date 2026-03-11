import type { FC, SVGProps } from 'react'

const ArrowLeftIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12.5L20 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.99996 17.5C8.99996 17.5 4.00001 13.8176 4 12.5C3.99999 11.1824 9 7.5 9 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowLeftIcon
