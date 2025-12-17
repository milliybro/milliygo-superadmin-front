import type { FC, SVGProps } from 'react'

const StudentCardIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M11.6667 2.91699C14.8094 2.91699 16.3808 2.91699 17.3571 3.95433C18.3334 4.99165 18.3334 6.66121 18.3334 10.0003C18.3334 13.3394 18.3334 15.009 17.3571 16.0463C16.3808 17.0837 14.8094 17.0837 11.6667 17.0837H8.33341C5.19071 17.0837 3.61937 17.0837 2.64306 16.0463C1.66675 15.009 1.66675 13.3394 1.66675 10.0003C1.66675 6.66121 1.66675 4.99165 2.64306 3.95433C3.61937 2.91699 5.19071 2.91699 8.33341 2.91699H11.6667Z"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M4.16675 12.9162C5.50729 11.1351 8.62833 11.0379 10.0001 12.9162M8.54091 8.54132C8.54091 9.34674 7.88801 9.99966 7.0826 9.99966C6.27719 9.99966 5.62426 9.34674 5.62426 8.54132C5.62426 7.73592 6.27719 7.08301 7.0826 7.08301C7.88801 7.08301 8.54091 7.73592 8.54091 8.54132Z"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M12.5 7.91699H15.8333"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M12.5 11.25H14.1667"
      stroke="#232E40"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
)

export default StudentCardIcon
