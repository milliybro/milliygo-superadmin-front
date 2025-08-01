import { ListResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useMemo } from 'react'
import { getTopDestinations } from '../../api'
import { ITopDestination } from '../../types'

interface ITopDestinationContextValue {
  topDestinations: {
    data?: ListResponse<ITopDestination[]>
    isFetching: boolean
  }
}

const TopDestinationsContext =
  createContext<ITopDestinationContextValue | null>(null)

export default function TopDestinationProvider({
  children,
}: {
  children: ReactNode
}) {
  const topDestinationsQuery = useQuery({
    queryKey: ['topDestinations'],
    queryFn: () => getTopDestinations(),
    enabled: true,
    placeholderData: data => data,
  })

  const value = useMemo<ITopDestinationContextValue>(() => {
    return {
      topDestinations: {
        data: topDestinationsQuery.data,
        isFetching: topDestinationsQuery.isFetching,
      },
    }
  }, [topDestinationsQuery.data, topDestinationsQuery.isFetching])

  return (
    <TopDestinationsContext.Provider value={value}>
      {children}
    </TopDestinationsContext.Provider>
  )
}

export { TopDestinationsContext, TopDestinationProvider }
