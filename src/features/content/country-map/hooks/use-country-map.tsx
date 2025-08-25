import { useContext } from "react"
import { CountryMapContext } from "../context/country-map-context"

const useCountryMapContext = () => {
  const context = useContext(CountryMapContext)
  if (!context) {
    throw new Error(
      'useCountryMapContext must be used within a CountryMapProvider',
    )
  }
  return context
}

export default useCountryMapContext