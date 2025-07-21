import { useEffect, useRef, useState } from 'react'

import { motion } from 'motion/react'
import { useParams } from 'react-router'
import { regionPaths } from '../../assets/region-paths'
import RegionPointsSVG from './region-points-svg'
import RegionSVG from './region-svg'
import NewRegionPoint from './new-region-point'

// hovered = #8494B3
// normal = #3276FF

function CountryMapSVG() {
  const mapRef = useRef<SVGSVGElement>(null)
  const { region: selectedRegion } = useParams()

  const [viewBox, setViewBox] = useState<string>('0 0 906 563')
  const [scaleFactor, setScaleFactor] = useState<number>(1)

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    setViewBox('0 0 906 563')
    setScaleFactor(1)

    // if (!selectedRegion) {
    //   return
    // }

    const pathG = map.getElementById(
      selectedRegion as any,
    ) as SVGPathElement | null

    if (!pathG) return

    const pathGCopy = pathG.querySelector('path')

    if (!pathGCopy) return

    pathGCopy.setAttribute('stroke', '#7987A4')
    pathGCopy.setAttribute('stroke-opacity', '0.7')
    pathGCopy.setAttribute('strokeWidth', '2')
    pathGCopy.setAttribute('strokeLinejoin', 'round')

    const bbox = pathG.getBBox()
    const { x, y, width, height } = bbox

    const padding = 15
    const scale = 0.9
    const newWidth = width / scale
    const newHeight = height / scale
    const offsetX = (newWidth - width) / 2
    const offsetY = (newHeight - height) / 2
    const newX = x - offsetX - padding
    const newY = y - offsetY - padding

    const originalWidth = 906
    const originalHeight = 563
    const xScale = originalWidth / (newWidth + padding * 2)
    const yScale = originalHeight / (newHeight + padding * 2)

    setScaleFactor(Math.min(xScale, yScale))
    setViewBox(
      `${newX} ${newY} ${newWidth + padding * 2} ${newHeight + padding * 2}`,
    )
  }, [selectedRegion])

  return (
    <div className="relative flex h-[563px] w-full overflow-hidden rounded-2xl border">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="563"
        viewBox={viewBox}
        fill="none"
        id="map"
        ref={mapRef}
        animate={{ viewBox }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="mx-auto"
      >
        <g id="regions" className="*:cursor-pointer">
          {regionPaths?.map(reg => <RegionSVG reg={reg} key={reg?.id} />)}
          {selectedRegion !== null && (
            <RegionPointsSVG scaleFactor={scaleFactor} />
          )}
          <NewRegionPoint scaleFactor={scaleFactor} />
        </g>
      </motion.svg>
    </div>
  )
}

export default CountryMapSVG
