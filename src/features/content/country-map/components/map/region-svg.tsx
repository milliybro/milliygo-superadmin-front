import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { twMerge } from 'tailwind-merge'
import {
  IRegionPath,
  pathClassname,
  rectClassname,
  textClassname,
} from '../../assets/region-paths'

function RegionSVG({ reg }: { reg: IRegionPath }) {
  const { t } = useTranslation()
  const { region: selectedRegion } = useParams()

  const translated = t(reg?.name)

  return (
    <g
      className={twMerge(
        'group transition-all duration-200 ease-in-out',
        // !!selectedRegion && +(selectedRegion || 0) === reg?.id
        //   ? 'opacity-100'
        //   : 'opacity-20 hover:opacity-50',
      )}
      id={'' + reg?.id}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d={reg?.path}
        fill={+(selectedRegion || 0) === reg?.id ? '#D6E4FF' : '#EBF2FF'}
        stroke="#7987A4"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className={selectedRegion === null ? pathClassname : ''}
        vectorEffect="non-scaling-stroke"
      />
      {selectedRegion === null && (
        <>
          <rect
            xmlns="http://www.w3.org/2000/svg"
            {...reg?.rect}
            {...reg?.coords}
            rx="7.5"
            fill="white"
            stroke="#B7BFD5"
            className={rectClassname}
            z={5}
          />
          <text
            {...reg?.coords}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="black"
            fontWeight={600}
            className={textClassname}
            fontSize={14}
            stroke="none"
          >
            {translated.split(' ').map((word, idx) => (
              <tspan
                key={idx}
                x={reg?.coords?.x}
                dx={reg?.text?.dx}
                dy={reg?.text?.dy[idx] ?? 0}
              >
                {word}
              </tspan>
            ))}
          </text>
          <circle
            xmlns="http://www.w3.org/2000/svg"
            {...reg?.circle}
            r="7"
            fill="#3276FF"
            stroke="white"
            strokeWidth={2}
          />{' '}
        </>
      )}
    </g>
  )
}

export default RegionSVG
