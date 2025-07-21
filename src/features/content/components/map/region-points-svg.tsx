import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { twMerge } from 'tailwind-merge'
import {
  rectClassname,
  regionPaths,
  textClassname,
} from '../../assets/region-paths'

function RegionPointsSVG({ scaleFactor = 1 }: { scaleFactor?: number }) {
  const { region: selectedRegion } = useParams()

  const { t } = useTranslation()
  const reg = useMemo(
    () => regionPaths?.find(r => r.id === +(selectedRegion || 0)),
    [selectedRegion],
  )

  if (!reg || !reg?.points) return null
  const { points } = reg

  return (
    <>
      {points?.map((point, i) => {
        const x = point?.coords?.x
        const y = point?.coords?.y
        const height = 40 / scaleFactor
        const width = 15 / scaleFactor
        const radius = 10 / scaleFactor

        const translatedTitle = t(point?.title)

        const roundedPathD = `
                 M ${x} ${y}
                 L ${x} ${y - height + radius}
                 Q ${x} ${y - height}, ${x + radius} ${y - height}
                 L ${x + width} ${y - height}
               `

        const rectHeight = point?.coords?.height / scaleFactor
        const rectWidth = point?.coords?.width / scaleFactor

        const rectX = point?.coords?.x + width
        const rectY = point?.coords?.y - rectHeight / 2 - height

        return (
          <g key={i} className="group select-none">
            <rect
              xmlns="http://www.w3.org/2000/svg"
              // {...point?.coords}
              x={rectX}
              y={rectY}
              height={rectHeight}
              width={rectWidth}
              rx={8 / scaleFactor}
              fill="white"
              stroke="#B7BFD5"
              className={twMerge(rectClassname, 'hover:fill-primary')}
              vectorEffect="non-scaling-stroke"
              z={10}
            />
            <text
              x={rectX + rectWidth / 2}
              y={rectY + rectHeight / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontWeight={500}
              className={textClassname}
              fontSize={14 / scaleFactor}
              stroke="none"
              vectorEffect="non-scaling-size"
            >
              {translatedTitle?.split('_').map((word, i, arr) => (
                <tspan
                  key={word}
                  x={rectX + rectWidth / 2}
                  dy={
                    i !== 0
                      ? `${1 / scaleFactor}rem`
                      : arr?.length > 1
                        ? `${-0.5 / scaleFactor}rem`
                        : '0%'
                  }
                >
                  {word}
                </tspan>
              ))}
            </text>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d={roundedPathD}
              fill="none"
              stroke="#7987A4"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              xmlns="http://www.w3.org/2000/svg"
              cx={point?.coords?.x}
              cy={point?.coords?.y}
              r={7 / scaleFactor}
              fill="#3276FF"
              stroke="white"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        )
      })}
    </>
  )
}

export default RegionPointsSVG
