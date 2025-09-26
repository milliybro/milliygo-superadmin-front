import { useContext } from 'react'
import { TopDestinationsContext } from '../context/top-destination-context'

export default function useTopDestinationsContext() {
  const context = useContext(TopDestinationsContext)

  if (!context) {
    throw new Error(
      'useTopDestinationsContext must be used within a TopDestinationProvider',
    )
  }

  return context
}
