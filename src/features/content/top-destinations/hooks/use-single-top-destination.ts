import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router'
import { getTopDestination } from '../api'

export function useSingleTopDestination() {
  const { slug: destinationId } = useParams()
  const { pathname } = useLocation()

  return useQuery({
    queryKey: ['topDestinations', 'single', destinationId, pathname],
    queryFn: () => getTopDestination(destinationId as string),
    enabled: !!destinationId,
    // throwOnError: true,
    refetchOnMount: 'always',
    staleTime: 0,
  })
}
