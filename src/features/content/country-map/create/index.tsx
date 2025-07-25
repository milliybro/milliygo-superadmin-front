import CountryMapProvider from '../context/country-map-context'
import CreateRegionSpot from './create-region-spot'

export default function CreateRegion() {
  return (
    <CountryMapProvider>
      <CreateRegionSpot />
    </CountryMapProvider>
  )
}
