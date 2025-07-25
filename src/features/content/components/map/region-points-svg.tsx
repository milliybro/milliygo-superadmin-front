import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getRegionMapPoints } from '../../api'
import RegionPointSVG from './region-point-svg'

function RegionPointsSVG({ scaleFactor = 1 }: { scaleFactor?: number }) {
  const { region: selectedRegion } = useParams()

  // const reg = useMemo(
  //   () => regionPaths?.find(r => r.id === +(selectedRegion || 0)),
  //   [selectedRegion],
  // )

  const { data } = useQuery({
    queryKey: ['region-spots', selectedRegion],
    queryFn: () => getRegionMapPoints({ region_id: +selectedRegion! }),
    enabled: !!selectedRegion,
    gcTime: 0,
  })

  // if (!reg || !reg?.points) return null
  // const { points } = reg

  return (
    <>
      {data?.results?.map((point, i) => (
        <RegionPointSVG key={i} point={point} scaleFactor={scaleFactor} />
      ))}
    </>
  )
}

export default RegionPointsSVG
