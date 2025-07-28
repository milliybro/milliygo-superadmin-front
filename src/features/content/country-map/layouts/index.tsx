import { Outlet } from 'react-router'
import CountryMapProvider from '../context/country-map-context'

export default function CountryMapLayout() {
  return (
    <CountryMapProvider>
      <Outlet />
    </CountryMapProvider>
  )
}
