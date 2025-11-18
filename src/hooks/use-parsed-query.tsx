import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router'

export function useParsedQuery() {
  const { search } = useLocation()
  const query = useMemo(() => queryString.parse(search), [search])
  return query
}
