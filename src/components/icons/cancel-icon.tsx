import type { FC, SVGProps } from 'react'

const CancelIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <path
      d="M12 4.25L4 12.25"
      stroke="#991B1B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 4.25L12 12.25"
      stroke="#991B1B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CancelIcon
