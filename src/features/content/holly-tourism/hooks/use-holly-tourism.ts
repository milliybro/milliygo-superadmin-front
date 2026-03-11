import { useParsedQuery } from '@/hooks/use-parsed-query'
import { useQuery } from '@tanstack/react-query'
import { getHollyTourismList } from '../api'

export default function useHollyTourism() {
  const queries = useParsedQuery()

  return useQuery({
    queryKey: ['holly-tourism', queries],
    queryFn: () => getHollyTourismList({ ...queries, page_size: 10 }),
    enabled: true,
    placeholderData: data => data,
  })
}
