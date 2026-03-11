import type { FC, SVGProps } from 'react'

const UserIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.62571 17.272C6.09304 18.1847 2.07448 20.0481 4.52205 22.3799C5.71767 23.519 7.04928 24.3337 8.72344 24.3337H18.2766C19.9507 24.3337 21.2823 23.519 22.478 22.3799C24.9255 20.0481 20.907 18.1847 19.3743 17.272C15.7802 15.132 11.2198 15.132 7.62571 17.272Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.375 7.54199C18.375 10.2344 16.1924 12.417 13.5 12.417C10.8076 12.417 8.625 10.2344 8.625 7.54199C8.625 4.8496 10.8076 2.66699 13.5 2.66699C16.1924 2.66699 18.375 4.8496 18.375 7.54199Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

export default UserIcon
