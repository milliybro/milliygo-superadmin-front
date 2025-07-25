import CountryMapProvider from '../context/country-map-context'
import EditRegionSpot from './edit-region-spot'

export default function EditRegionPage() {
  return (
    <CountryMapProvider>
      <EditRegionSpot />
    </CountryMapProvider>
  )
}
