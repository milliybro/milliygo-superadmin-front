import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getTopDestination } from '../api'

export function useSingleTopDestination() {
  const { slug: destinationId } = useParams()

  return useQuery({
    queryKey: ['topDestinations', 'single', destinationId],
    queryFn: () => getTopDestination(destinationId as string),
    enabled: !!destinationId,
    throwOnError: true,
  })
}
