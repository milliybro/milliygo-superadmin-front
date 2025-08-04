import { ListResponse } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createContext, useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import {
  createDiscovery,
  editDiscovery,
  getDiscoveries,
  getDiscovery,
} from '../api'
import { IDiscover } from '../types'
import { App } from 'antd'

export interface IDiscoverContext {
  discover: {
    data?: ListResponse<IDiscover[]>
    isFetching: boolean
  }
  singleDiscover: {
    data?: IDiscover & { content: string | null }
    isFetching: boolean
  }
  createDiscovery: {
    mutate: (data: FormData) => void
    isLoading: boolean
  }
  editDiscovery: {
    mutate: (data: FormData) => void
    isLoading: boolean
  }
}

const DiscoverContext = createContext<IDiscoverContext | null>(null)

function DiscoverProvider({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const slug = searchParams.get('slug')
  const { notification } = App.useApp()

  const discoverQuery = useQuery({
    queryKey: ['discoveries'],
    queryFn: () => getDiscoveries(),
    enabled: pathname === '/content/discover-uzbekistan',
    refetchOnWindowFocus: false,
  })

  const singleDiscoverQuery = useQuery({
    queryKey: ['single-discovery', slug],
    queryFn: () => getDiscovery(slug as string),
    enabled: !!slug,
    refetchOnWindowFocus: false,
    throwOnError: () => {
      return true
    },
  })

  const createDiscoveryMutation = useMutation({
    mutationFn: (data: FormData) => createDiscovery(data),
    onSuccess: () => {
      discoverQuery.refetch()
      singleDiscoverQuery.refetch()
      notification.success({
        message: 'Успешно',
        description: 'Открытие успешно создано',
      })
    },
  })

  const editDiscoveryMutation = useMutation({
    mutationFn: (data: FormData) => editDiscovery(slug as string, data),
    onSuccess: () => {
      discoverQuery.refetch()
      singleDiscoverQuery.refetch()
      notification.success({
        message: 'Успешно',
        description: 'Открытие успешно обновлено',
      })
    },
  })

  const discoverContextValue = useMemo<IDiscoverContext>(
    () => ({
      discover: {
        data: discoverQuery.data,
        isFetching: discoverQuery.isFetching,
      },
      singleDiscover: {
        data: singleDiscoverQuery.data,
        isFetching: singleDiscoverQuery.isFetching,
      },
      createDiscovery: {
        mutate: createDiscoveryMutation.mutate,
        isLoading: createDiscoveryMutation.isPending,
      },
      editDiscovery: {
        mutate: editDiscoveryMutation.mutate,
        isLoading: editDiscoveryMutation.isPending,
      },
    }),
    [
      discoverQuery.data,
      discoverQuery.isFetching,
      singleDiscoverQuery.data,
      singleDiscoverQuery.isFetching,
    ],
  )

  return (
    <DiscoverContext.Provider value={discoverContextValue}>
      {children}
    </DiscoverContext.Provider>
  )
}

export default DiscoverProvider
export { DiscoverContext, DiscoverProvider }
