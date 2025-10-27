import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      if (!window) {
        return
      }
      const { innerHeight, innerWidth } = window
      setWindowSize({
        width: innerWidth,
        height: innerHeight,
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
