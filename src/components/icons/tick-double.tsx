import type { FC, SVGProps } from 'react'

const TickDoubleIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.66675 9.22287L4.00008 11.6673L4.68276 10.9521M11.0001 4.33398L6.9581 8.56844"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 9.22287L7.33333 11.6673L14.3333 4.33398"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default TickDoubleIcon
