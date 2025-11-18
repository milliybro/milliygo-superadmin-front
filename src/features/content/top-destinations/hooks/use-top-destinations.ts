import { useParsedQuery } from '@/hooks/use-parsed-query'
import { useQuery } from '@tanstack/react-query'
import { getTopDestinations } from '../../api'

export default function useTopDestinations() {
  const queries = useParsedQuery()

  return useQuery({
    queryKey: ['topDestinations', queries],
    queryFn: () => getTopDestinations({ ...queries, page_size: 10 }),
    enabled: true,
    placeholderData: data => data,
  })
}
