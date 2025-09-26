import { useQuery } from '@tanstack/react-query'
import { getRegions } from '../../api'

export function useRegions() {
  return useQuery({
    queryKey: ['regions'],
    queryFn: () => getRegions({ page_size: 14 }),
    enabled: true,
  })
}
