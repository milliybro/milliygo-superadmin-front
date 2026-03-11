import { matchPath, useLocation } from 'react-router'

export default function useMatchEither(patterns: string[]): boolean {
  const { pathname } = useLocation()

  return patterns.some(pattern => matchPath(pattern, pathname))
}
