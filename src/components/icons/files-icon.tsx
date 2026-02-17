import type { FC, SVGProps } from 'react'

const FilesIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17.7143 21.2143H6.28571C5.02335 21.2143 4 20.191 4 18.9286V4.07143C4 2.80906 5.02335 1.78571 6.28571 1.78571H14.2857L20 7.5V18.9286C20 20.191 18.9767 21.2143 17.7143 21.2143Z"
      stroke="#777E90"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.2858 2.35714V6.35714C14.2858 6.98832 14.7974 7.5 15.4286 7.5H19.4286"
      stroke="#777E90"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 12.0714H12.5714M8 16.6429H16"
      stroke="#777E90"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default FilesIcon
