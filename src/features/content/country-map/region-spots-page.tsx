import CountryMapProvider from './context/country-map-context'
import RegionSpots from './region-spots'

export default function RegionSpotsPage() {
  return (
    <CountryMapProvider>
      <RegionSpots />
    </CountryMapProvider>
  )
}
