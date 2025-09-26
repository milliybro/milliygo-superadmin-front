import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router'
import { getTopDestinations } from '../../api'

export default function useTopDestinations() {
  const { search } = useLocation()
  const queries = useMemo(() => queryString.parse(search), [search])

  return useQuery({
    queryKey: ['topDestinations', queries],
    queryFn: () => getTopDestinations({ ...queries, page_size: 10 }),
    enabled: true,
    placeholderData: data => data,
  })
}
