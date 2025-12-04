import type { FC, SVGProps } from 'react'

const BuildingIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 2.16602H6.5C3.81117 2.16602 3.25 2.72718 3.25 5.41602V23.8327H16.25V5.41602C16.25 2.72718 15.6888 2.16602 13 2.16602Z"
      stroke="#2563EB"
      strokeWidth="1.625"
      strokeLinejoin="round"
    />
    <path
      d="M19.5 8.66602H16.25V23.8327H22.75V11.916C22.75 9.22718 22.1888 8.66602 19.5 8.66602Z"
      stroke="#2563EB"
      strokeWidth="1.625"
      strokeLinejoin="round"
    />
    <path
      d="M8.6665 6.5H10.8332M8.6665 9.75H10.8332M8.6665 13H10.8332"
      stroke="#2563EB"
      strokeWidth="1.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.4582 23.834V19.5007C12.4582 18.4793 12.4582 17.9686 12.1409 17.6513C11.8236 17.334 11.3129 17.334 10.2915 17.334H9.20817C8.18679 17.334 7.67611 17.334 7.3588 17.6513C7.0415 17.9686 7.0415 18.4793 7.0415 19.5007V23.834"
      stroke="#2563EB"
      strokeWidth="1.625"
      strokeLinejoin="round"
    />
  </svg>
)

export default BuildingIcon
