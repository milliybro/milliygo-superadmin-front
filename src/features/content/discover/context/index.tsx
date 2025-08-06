import { ListResponse } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { App } from 'antd'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react'
import { useLocation, useParams } from 'react-router'
import {
  createDiscovery,
  editDiscovery,
  getDiscoveries,
  getDiscovery,
} from '../api'
import { IDiscover } from '../types'

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
    mutate: (data: object) => void
    isLoading: boolean
  }
  editDiscovery: {
    mutate: (data: object) => void
    isLoading: boolean
  }
  content: string
  setContent: Dispatch<SetStateAction<string>>
}

const DiscoverContext = createContext<IDiscoverContext | null>(null)

function DiscoverProvider({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const { pathname } = useLocation()
  const slug = params?.slug
  const { notification } = App.useApp()
  const [content, setContent] = useState<string>('')

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
    mutationFn: (data: object) => createDiscovery(data),
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
    mutationFn: (data: object) => editDiscovery(slug as string, data),
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
      content,
      setContent,
    }),
    [
      discoverQuery.data,
      discoverQuery.isFetching,
      singleDiscoverQuery.data,
      singleDiscoverQuery.isFetching,
      content,
      setContent,
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
