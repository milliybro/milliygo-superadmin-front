import { twMerge } from 'tailwind-merge'
import RegionPointSVG from './region-point-svg'
import useCountryMapContext from '../../hooks/use-country-map'

function RegionPointsSVG({
  scaleFactor = 1,
  exclude,
}: {
  scaleFactor?: number
  exclude?: number
}) {
  const { points } = useCountryMapContext()

  // const reg = useMemo(
  //   () => regionPaths?.find(r => r.id === +(selectedRegion || 0)),
  //   [selectedRegion],
  // )

  // if (!reg || !reg?.points) return null
  // const { points } = reg

  return (
    <g className={twMerge(!!exclude && 'opacity-50')}>
      {points?.results
        ?.filter(point => point.id !== exclude)
        ?.map((point, i) => (
          <RegionPointSVG key={i} point={point} scaleFactor={scaleFactor} />
        ))}
    </g>
  )
}

export default RegionPointsSVG
