import { useContext } from 'react'
import { DiscoverContext } from '../context'

export function useDiscoverContext() {
  const context = useContext(DiscoverContext)

  if (!context) {
    throw new Error('useDiscoverContext must be used within a DiscoverProvider')
  }

  return context
}
