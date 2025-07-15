import type { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import Icon from '@ant-design/icons/lib/components/Icon'

const icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 70 52"
    fill="none"
  >
    <path
      d="M6.05172 8.745L17.2131 6.88477V40.7372L12.3018 41.7712C9.01306 42.4636 5.79705 40.3199 5.17081 37.0179L1.14319 15.7814C0.515988 12.4743 2.73148 9.29837 6.05172 8.745Z"
      stroke="#635BFF"
      strokeWidth={2}
    />
    <path
      d="M63.9483 8.745L52.7869 6.88477V40.7372L57.6982 41.7712C60.9869 42.4636 64.203 40.3199 64.8292 37.0179L68.8568 15.7814C69.484 12.4743 67.2685 9.29837 63.9483 8.745Z"
      stroke="#635BFF"
      strokeWidth={2}
    />
    <g filter="url(#filter0_dd_418_2152)">
      <rect
        x={17.0656}
        y={1}
        width={35.8689}
        height={42.7541}
        rx={5}
        stroke="#635BFF"
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </g>
    <path
      d="M38.9825 33.0889C39.7331 33.9524 41.0385 34.0023 41.8536 33.2422L42.0099 33.0791L47.2452 26.9756L52.9347 33.0977V38.7539C52.9345 41.5151 50.6959 43.7537 47.9347 43.7539H22.0656C19.3042 43.7539 17.0657 41.5152 17.0656 38.7539V35.293L29.4728 22.1445L38.9825 33.0889Z"
      fill="#E0DEFF"
      stroke="#635BFF"
      strokeWidth={2}
    />
    <circle
      cx={39.5902}
      cy={14.3446}
      r={4.16393}
      fill="#E0DEFF"
      stroke="#635BFF"
      strokeWidth={2}
    />
    <defs>
      <filter
        id="filter0_dd_418_2152"
        x={13.0656}
        y={0}
        width={43.8689}
        height={51.7539}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_418_2152"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={1.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_418_2152"
          result="effect2_dropShadow_418_2152"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_418_2152"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default function ImageUploadIcon(
  props: Partial<CustomIconComponentProps>,
): ReactElement {
  return <Icon component={icon} {...props} />
}
