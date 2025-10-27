import { COMPACT_SCREEN_WIDTH } from '@/config/constants'
import { useWindowSize } from './use-window-size'

export function useCompactScreen() {
  const { width } = useWindowSize()

  return width < COMPACT_SCREEN_WIDTH
}
