import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router'
import { getHollyTourism } from '../api/index'

export function useSingleHollyTourism(language: string) {
  const { slug } = useParams()
  const { pathname } = useLocation()

  return useQuery({
    queryKey: ['holly-tourism', slug, pathname, language],
    queryFn: () => getHollyTourism(slug as string, language),
    enabled: !!slug,
    refetchOnMount: 'always',
    staleTime: 0,
  })
}
