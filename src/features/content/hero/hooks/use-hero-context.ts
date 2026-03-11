import { useContext } from 'react'
import { HeroContext } from '../context'

export function useHeroContext() {
  const ctx = useContext(HeroContext)

  if (!ctx) {
    throw new Error('useHeroContext must be used within a HeroProvider')
  }

  return ctx
}
