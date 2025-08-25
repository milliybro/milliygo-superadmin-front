import { IRegionMapPoint } from '@/features/content/types'
import {
  PointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useParams } from 'react-router'
import { twMerge } from 'tailwind-merge'
import {
  rectClassname,
  regionPaths,
  textClassname,
} from '../../assets/region-paths'
import useCountryMapContext from '../../hooks/use-country-map'

export default function NewRegionPoint({
  scaleFactor = 1,
  pointTitle,
  isEdit,
  point,
}: {
  scaleFactor?: number
  pointTitle?: string
  isEdit?: boolean
  point?: IRegionMapPoint
}) {
  // const [newCoords, setNewCoords] = useState<{ x: number; y: number }>({
  //   x: 0,
  //   y: 0,
  // })
  const { newCoords, setNewCoords } = useCountryMapContext()
  const dragging = useRef(false)
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const pointerRef = useRef<SVGGElement>(null)
  const measureRef1 = useRef<SVGTextElement>(null)
  const measureRef2 = useRef<SVGTextElement>(null)
  const [rectW, setRectW] = useState(90 / scaleFactor)

  const { region: selectedRegion } = useParams()

  const reg = useMemo(
    () => regionPaths?.find(r => r.id === +(selectedRegion || 0)),
    [selectedRegion],
  )

  const [line1, line2] = useMemo(() => {
    if (!pointTitle) return ['', '']

    const words = pointTitle?.trim()?.split(/\s+/)
    if (words?.length <= 1) {
      return [pointTitle?.trim(), '']
    }

    const mid = Math.ceil(words?.length / 2)
    return [words?.slice(0, mid).join(' '), words?.slice(mid).join(' ')]
  }, [pointTitle])

  const isTwoLines = !!line2
  const fontSize = 14 / scaleFactor
  const lineHeight = fontSize * 1.2
  const paddingY = 6 / scaleFactor
  const paddingX = 12 / scaleFactor

  useEffect(() => {
    const len1 = measureRef1.current
      ? measureRef1.current.getComputedTextLength()
      : 0
    const len2 = measureRef2.current
      ? measureRef2.current.getComputedTextLength()
      : 0
    const maxLen = Math.max(len1, len2)
    setRectW(Math.max(maxLen + paddingX * 2, 90 / scaleFactor))
  }, [line1, line2, scaleFactor])

  useEffect(() => {
    const selectedPath = document.getElementById(
      '' + reg?.id || '',
    ) as SVGPathElement | null
    if (!selectedPath) return

    const bbox = selectedPath.getBBox()
    const { x, y, height, width } = bbox

    setNewCoords({
      x: x + width / 2,
      y: y + height / 2,
    })
  }, [reg?.id])

  const handlePointerDown = useCallback((e: PointerEvent<SVGGElement>) => {
    dragging.current = true
    lastMousePos.current = { x: e.clientX, y: e.clientY }
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback(
    (e: PointerEvent<SVGAElement>) => {
      const selectedPath = document.getElementById(
        '' + reg?.id || '',
      ) as SVGPathElement | null

      const newPointer = pointerRef.current

      if (!newPointer) return

      if (!selectedPath) return

      if (!dragging.current) return

      const bbox = selectedPath.getBBox()

      const dx = (e.clientX - lastMousePos.current.x) / scaleFactor
      const dy = (e.clientY - lastMousePos.current.y) / scaleFactor

      setNewCoords(prev => ({
        x:
          dx < 0
            ? Math.max(prev.x + dx, bbox.x)
            : Math.min(prev.x + dx, bbox.x + bbox.width),
        y:
          dy < 0
            ? Math.max(prev.y + dy, bbox.y)
            : Math.min(prev.y + dy, bbox.y + bbox.height),
      }))

      lastMousePos.current = { x: e.clientX, y: e.clientY }
    },
    [scaleFactor, reg?.id],
  )

  const handlePointerUp = useCallback((e: PointerEvent<SVGAElement>) => {
    dragging.current = false
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }, [])

  const x = newCoords?.x
  const y = newCoords?.y
  const height = 40 / scaleFactor
  const width = 15 / scaleFactor
  const radius = 10 / scaleFactor

  const roundedPathD = `
    M ${x} ${y}
    L ${x} ${y - height + radius}
    Q ${x} ${y - height}, ${x + radius} ${y - height}
    L ${x + width} ${y - height}
  `

  const rectHeight = (isTwoLines ? 2 : 1) * lineHeight + paddingY * 2

  const rectX = newCoords.x + width
  const rectY = newCoords.y - rectHeight / 2 - height

  if (isEdit && !point) {
    return null
  }

  return (
    <g
      ref={pointerRef}
      className="group"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <text
        ref={measureRef1}
        x={-9999}
        y={-9999}
        fontSize={14 / scaleFactor}
        fontWeight={500}
        className={textClassname}
      >
        {line1}
      </text>
      <text
        ref={measureRef2}
        x={-9999}
        y={-9999}
        fontSize={14 / scaleFactor}
        fontWeight={500}
        className={textClassname}
      >
        {line2}
      </text>
      <rect
        xmlns="http://www.w3.org/2000/svg"
        x={rectX}
        y={rectY}
        height={rectHeight}
        width={rectW}
        rx={8 / scaleFactor}
        fill="white"
        stroke="#B7BFD5"
        className={twMerge(rectClassname, 'hover:fill-primary')}
        vectorEffect="non-scaling-stroke"
        z={10}
      />
      <text
        x={rectX + rectW / 2}
        y={rectY + paddingY + rectHeight / (isTwoLines ? 4 : 2)}
        textAnchor="middle"
        fill="black"
        fontWeight={500}
        fontSize={fontSize}
        vectorEffect="non-scaling-size"
        className={textClassname}
      >
        <tspan x={rectX + rectW / 2} dy={0}>
          {line1}
        </tspan>
        {isTwoLines && (
          <tspan x={rectX + rectW / 2} dy={lineHeight}>
            {line2}
          </tspan>
        )}
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
        cx={newCoords?.x}
        cy={newCoords?.y}
        r={7 / scaleFactor}
        fill="#3276FF"
        stroke="white"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  )
}
