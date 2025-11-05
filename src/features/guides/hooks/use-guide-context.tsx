import { useContext } from 'react'
import { GuideContext } from '../context'

export function useGuideContext() {
  const context = useContext(GuideContext)
  if (!context) {
    throw new Error('useGuideContext must be used within a GuideProvider')
  }
  return context
}
