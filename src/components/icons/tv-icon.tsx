import type { FC, SVGProps } from 'react'

const TvIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 13C1 9.22876 1 7.34315 2.17157 6.17157C3.34315 5 5.22876 5 9 5H13C16.7712 5 18.6569 5 19.8284 6.17157C21 7.34315 21 9.22876 21 13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H9C5.22876 21 3.34315 21 2.17157 19.8284C1 18.6569 1 16.7712 1 13Z"
      stroke="#141B34"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M8 2L11 5L15 1"
      stroke="#141B34"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default TvIcon
