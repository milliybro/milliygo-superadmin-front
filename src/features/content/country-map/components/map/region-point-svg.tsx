import { IRegionMapPoint } from '@/features/content/types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { rectClassname, textClassname } from '../../assets/region-paths'

interface IProps {
  point: IRegionMapPoint
  scaleFactor?: number
}

export default function RegionPointSVG({ point, scaleFactor = 1 }: IProps) {
  const { t } = useTranslation()

  const x = point.front_data.x
  const y = point.front_data.y
  const height = 40 / scaleFactor
  const width = 15 / scaleFactor
  const radius = 10 / scaleFactor

  const roundedPathD = `
    M ${x} ${y}
    L ${x} ${y - height + radius}
    Q ${x} ${y - height}, ${x + radius} ${y - height}
    L ${x + width} ${y - height}
  `

  const translated = t(point.front_data.point_title || '').trim()
  const [line1, line2] = useMemo(() => {
    const words = translated.split(/\s+/)
    if (words.length <= 1) {
      return [translated, '']
    }
    const mid = Math.ceil(words.length / 2)
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
  }, [translated])

  const isTwoLines = !!line2

  const fontSize = 14 / scaleFactor
  const lineHeight = fontSize * 1.2
  const paddingX = 12 / scaleFactor
  const paddingY = 6 / scaleFactor

  const measureRef1 = useRef<SVGTextElement>(null)
  const measureRef2 = useRef<SVGTextElement>(null)

  const [rectWidth, setRectWidth] = useState(90 / scaleFactor)
  useEffect(() => {
    const len1 = measureRef1.current
      ? measureRef1.current.getComputedTextLength()
      : 0
    const len2 = measureRef2.current
      ? measureRef2.current.getComputedTextLength()
      : 0
    const maxLen = Math.max(len1, len2)
    setRectWidth(Math.max(maxLen + paddingX * 2, 90 / scaleFactor))
  }, [line1, line2, scaleFactor])

  const rectHeight = (isTwoLines ? 2 : 1) * lineHeight + paddingY * 2

  const rectX = x + width
  const rectY = y - rectHeight / 2 - height

  return (
    <g className="group select-none">
      <text
        ref={measureRef1}
        x={-9999}
        y={-9999}
        fontSize={fontSize}
        fontWeight={500}
        className={textClassname}
      >
        {line1}
      </text>
      <text
        ref={measureRef2}
        x={-9999}
        y={-9999}
        fontSize={fontSize}
        fontWeight={500}
        className={textClassname}
      >
        {line2}
      </text>

      <rect
        x={rectX}
        y={rectY}
        width={rectWidth}
        height={rectHeight}
        rx={8 / scaleFactor}
        fill="white"
        stroke="#B7BFD5"
        className={twMerge(rectClassname, 'hover:fill-primary')}
        vectorEffect="non-scaling-stroke"
      />

      <text
        x={rectX + rectWidth / 2}
        y={rectY + paddingY + fontSize}
        textAnchor="middle"
        fill="black"
        fontWeight={500}
        fontSize={fontSize}
        vectorEffect="non-scaling-size"
        className={textClassname}
      >
        <tspan x={rectX + rectWidth / 2} dy={0}>
          {line1}
        </tspan>
        {isTwoLines && (
          <tspan x={rectX + rectWidth / 2} dy={lineHeight}>
            {line2}
          </tspan>
        )}
      </text>

      <path
        d={roundedPathD}
        fill="none"
        stroke="#7987A4"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />

      <circle
        cx={x}
        cy={y}
        r={7 / scaleFactor}
        fill="#3276FF"
        stroke="white"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  )
}
