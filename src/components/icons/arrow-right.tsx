import Icon, {
  CustomIconComponentProps,
} from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const arrowRight = () => {
  return (
    <svg
      width="1em"
      height="auto"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="elements">
        <path
          id="Vector"
          d="M17 6.5L0.999983 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M12 11.5C12 11.5 17 7.81756 17 6.49996C17 5.18237 12 1.5 12 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function ArrowRightIcon(
  props: Partial<CustomIconComponentProps>,
): ReactElement {
  return <Icon component={arrowRight} {...props} />
}
