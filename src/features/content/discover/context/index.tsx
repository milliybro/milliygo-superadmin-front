import { useQuery } from '@tanstack/react-query'
import { createContext, useMemo } from 'react'
import { getDiscoveries } from '../api'
import { ListResponse } from '@/types'
import { IDiscover } from '../types'

export interface IDiscoverContext {
  discover: {
    data?: ListResponse<IDiscover[]>
    isFetching: boolean
  }
}

const DiscoverContext = createContext<IDiscoverContext | null>(null)

function DiscoverProvider({ children }: { children: React.ReactNode }) {
  const discoverQuery = useQuery({
    queryKey: ['discoveries'],
    queryFn: () => getDiscoveries(),
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const discoverContextValue = useMemo<IDiscoverContext>(
    () => ({
      discover: {
        data: discoverQuery.data,
        isFetching: discoverQuery.isFetching,
      },
    }),
    [discoverQuery.data, discoverQuery.isFetching],
  )

  return (
    <DiscoverContext.Provider value={discoverContextValue}>
      {children}
    </DiscoverContext.Provider>
  )
}

export default DiscoverProvider
export { DiscoverContext, DiscoverProvider }
