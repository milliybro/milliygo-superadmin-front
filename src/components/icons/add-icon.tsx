import type { FC, SVGProps } from 'react'

const AddCreateIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    {...props}
    width="71"
    height="52"
    viewBox="0 0 71 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.30172 8.745L17.4631 6.88477V40.7372L12.5518 41.7712C9.26306 42.4636 6.04705 40.3199 5.42081 37.0179L1.39319 15.7814C0.765988 12.4743 2.98148 9.29837 6.30172 8.745Z"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <path
      d="M64.1983 8.745L53.0369 6.88477V40.7372L57.9482 41.7712C61.2369 42.4636 64.453 40.3199 65.0792 37.0179L69.1068 15.7814C69.734 12.4743 67.5185 9.29837 64.1983 8.745Z"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <g filter="url(#filter0_dd_10422_13572)">
      <rect
        x="17.3154"
        y="1"
        width="35.8689"
        height="42.7541"
        rx="5"
        stroke="#635BFF"
        strokeWidth="2"
        shape-rendering="crispEdges"
      />
    </g>
    <path
      d="M48.1843 43.7546H22.3154C19.554 43.7546 17.3154 41.516 17.3154 38.7546L17.3154 35.2935L29.7222 22.1457L39.2324 33.0896C40.0331 34.011 41.4653 34.0064 42.26 33.0799L47.4955 26.977L53.1843 33.0984V38.7546C53.1843 41.516 50.9457 43.7546 48.1843 43.7546Z"
      fill="#E0DEFF"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <circle
      cx="39.8402"
      cy="14.3436"
      r="4.16393"
      fill="#E0DEFF"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <defs>
      <filter
        id="filter0_dd_10422_13572"
        x="13.3154"
        y="0"
        width="43.8687"
        height="51.7539"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_10422_13572"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_10422_13572"
          result="effect2_dropShadow_10422_13572"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_10422_13572"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default AddCreateIcon
