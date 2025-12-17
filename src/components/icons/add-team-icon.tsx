import type { FC, SVGProps } from 'react'

const AddTeamIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10.0001 6.24967C10.0001 7.86051 8.69425 9.16634 7.08341 9.16634C5.47258 9.16634 4.16675 7.86051 4.16675 6.24967C4.16675 4.63884 5.47258 3.33301 7.08341 3.33301C8.69425 3.33301 10.0001 4.63884 10.0001 6.24967Z"
      stroke="#232E40"
      stroke-width="1.5"
    />
    <path
      d="M11.25 9.16634C12.8608 9.16634 14.1667 7.86051 14.1667 6.24967C14.1667 4.63884 12.8608 3.33301 11.25 3.33301"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M10.9525 16.667H3.21436C2.35964 16.667 1.66675 16.0274 1.66675 15.2384C1.66675 13.266 3.39898 11.667 5.5358 11.667H8.631C9.502 11.667 10.3058 11.9327 10.9525 12.381"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.8333 11.667V16.667M18.3333 14.167H13.3333"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
)

export default AddTeamIcon
