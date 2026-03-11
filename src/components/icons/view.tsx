import type { FC, SVGProps } from 'react'

const ViewIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 8.5C10.5 7.39543 9.60457 6.5 8.5 6.5C7.39543 6.5 6.5 7.39543 6.5 8.5C6.5 9.60457 7.39543 10.5 8.5 10.5C9.60457 10.5 10.5 9.60457 10.5 8.5Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M8.5 3.83366C12.1819 3.83366 15.1667 8.50033 15.1667 8.50033C15.1667 8.50033 12.1819 13.167 8.5 13.167C4.8181 13.167 1.83333 8.50033 1.83333 8.50033C1.83333 8.50033 4.8181 3.83366 8.5 3.83366Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
  </svg>
)

export default ViewIcon
