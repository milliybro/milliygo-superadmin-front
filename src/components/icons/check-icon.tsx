import type { FC, SVGProps } from 'react'

const CheckIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <path
      d="M13.3332 4.25L5.99984 11.5833L2.6665 8.25"
      stroke="#115E59"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default CheckIcon
