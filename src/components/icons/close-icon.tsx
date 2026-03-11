import type { FC, SVGProps } from 'react'

const CloseIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4.5L4 12.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 4.5L12 12.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CloseIcon
