import type { FC, SVGProps } from 'react'

const Money2Icon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M13.3334 4.16675H6.66675C4.30972 4.16675 3.13121 4.16675 2.39898 4.89898C1.66675 5.63121 1.66675 6.80972 1.66675 9.16675V10.8334C1.66675 13.1904 1.66675 14.3689 2.39898 15.1012C3.13121 15.8334 4.30972 15.8334 6.66675 15.8334H13.3334C15.6904 15.8334 16.8689 15.8334 17.6012 15.1012C18.3334 14.3689 18.3334 13.1904 18.3334 10.8334V9.16675C18.3334 6.80972 18.3334 5.63121 17.6012 4.89898C16.8689 4.16675 15.6904 4.16675 13.3334 4.16675Z"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.4167 10H15.4251"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.5835 10H4.59183"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61925 12.5 7.5 11.3807 7.5 10C7.5 8.61925 8.61925 7.5 10 7.5C11.3807 7.5 12.5 8.61925 12.5 10Z"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export default Money2Icon
