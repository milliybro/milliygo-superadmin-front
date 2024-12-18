import type { FC, SVGProps } from 'react'

const MicrowaveIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 15.5V7.5C2 5.61438 2 4.67157 2.58579 4.08579C3.17157 3.5 4.11438 3.5 6 3.5H18C19.8856 3.5 20.8284 3.5 21.4142 4.08579C22 4.67157 22 5.61438 22 7.5V15.5C22 17.3856 22 18.3284 21.4142 18.9142C20.8284 19.5 19.8856 19.5 18 19.5H6C4.11438 19.5 3.17157 19.5 2.58579 18.9142C2 18.3284 2 17.3856 2 15.5Z"
      stroke="#141B34"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      opacity="0.4"
      d="M19 6.50895V6.5M19 9.50447V9.49553M19 12.5V12.4911"
      stroke="#141B34"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5 14.5V8.5C5 7.55719 5 7.08579 5.29289 6.79289C5.58579 6.5 6.05719 6.5 7 6.5H14C14.9428 6.5 15.4142 6.5 15.7071 6.79289C16 7.08579 16 7.55719 16 8.5V14.5C16 15.4428 16 15.9142 15.7071 16.2071C15.4142 16.5 14.9428 16.5 14 16.5H7C6.05719 16.5 5.58579 16.5 5.29289 16.2071C5 15.9142 5 15.4428 5 14.5Z"
      stroke="#141B34"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      opacity="0.4"
      d="M5 19.5V21.5M19 19.5V21.5"
      stroke="#141B34"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
)

export default MicrowaveIcon
