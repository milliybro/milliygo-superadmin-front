import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router'
import { getTopDestination } from '../api'

export function useSingleTopDestination(language: string) {
  const { slug: destinationId } = useParams()
  const { pathname } = useLocation()

  

  return useQuery({
    queryKey: ['topDestinations', 'single', destinationId, pathname, language],
    queryFn: () => getTopDestination(destinationId as string, language),
    enabled: !!destinationId,
    refetchOnMount: 'always',
    staleTime: 0,
  })
}
