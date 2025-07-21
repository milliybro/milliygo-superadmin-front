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

export default function NewRegionPoint({
  scaleFactor = 1,
}: {
  scaleFactor?: number
}) {
  const [newCoords, setNewCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const dragging = useRef(false)
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const { region: selectedRegion } = useParams()

  const reg = useMemo(
    () => regionPaths?.find(r => r.id === +(selectedRegion || 0)),
    [selectedRegion],
  )

  useEffect(() => {
    const selectedPath = document.getElementById(
      '' + reg?.id || '',
    ) as SVGPathElement | null
    if (!selectedPath) return

    selectedPath.addEventListener('mouseleave', () => {
      dragging.current = false
      console.log('mouseleave')
    })
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

  const handlePointerMove = useCallback((e: PointerEvent<SVGElement>) => {
    const selectedPath = document.getElementById(
      '' + reg?.id || '',
    ) as SVGPathElement | null
    if (!selectedPath) return

    if (!dragging.current) return

    // if (
    //   e.clientY > top ||
    //   e.clientY < bottom ||
    //   e.clientX < left ||
    //   e.clientX > right
    // ) {
    //   dragging.current = false
    //   return
    // }
    const dx = (e.clientX - lastMousePos.current.x) / scaleFactor
    const dy = (e.clientY - lastMousePos.current.y) / scaleFactor

    setNewCoords(prev => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }))

    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }, [])

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

  const rectHeight = 30 / scaleFactor
  const rectWidth = 90 / scaleFactor

  const rectX = newCoords.x + width
  const rectY = newCoords.y - rectHeight / 2 - height

  return (
    <g
      className="group"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <rect
        xmlns="http://www.w3.org/2000/svg"
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
        x={newCoords.x + 30 / 2}
        y={newCoords.y + 20 / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="black"
        fontWeight={500}
        className={textClassname}
        fontSize={14 / scaleFactor}
        stroke="none"
        vectorEffect="non-scaling-size"
      ></text>
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
