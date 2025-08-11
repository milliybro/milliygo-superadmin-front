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
import { useLocation, useNavigate, useParams } from 'react-router'
import {
  createDiscovery,
  deleteDiscovery,
  editDiscovery,
  getDiscoveries,
  getDiscovery,
} from '../api'
import { IDiscover } from '../types'
import queryString from 'query-string'
import { truthyObject } from '@/helpers/truthy-object'
import { useTranslation } from 'react-i18next'

export interface IDiscoverContext {
  deleteOpen: string | null
  setDeleteOpen: Dispatch<SetStateAction<string | null>>
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
    toggleStatusMutate: (params: { slug: string; data: FormData }) => void
    togglePending: boolean
  }
  deleteDiscovery: {
    mutate: (slug: string) => void
    isLoading: boolean
  }
}

const DiscoverContext = createContext<IDiscoverContext | null>(null)

function DiscoverProvider({ children }: { children: React.ReactNode }) {
  const [deleteOpen, setDeleteOpen] = useState<string | null>(null)
  const { t } = useTranslation()
  const params = useParams()
  const { pathname, search } = useLocation()
  const slug = params?.slug
  const { notification } = App.useApp()
  const queries = useMemo(() => queryString.parse(search), [search])
  const navigate = useNavigate()

  const discoverQuery = useQuery({
    queryKey: ['discoveries', queries],
    queryFn: () => getDiscoveries(truthyObject({ ...queries })),
    enabled: pathname === '/content/discover-uzbekistan',
    refetchOnWindowFocus: false,
    placeholderData: data => data,
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
      notification.success({
        message: t('content.discover.create-success'),
      })
      navigate('/content/discover-uzbekistan')
    },
  })

  const editDiscoveryMutation = useMutation({
    mutationFn: (data: FormData) => editDiscovery(slug as string, data),
    onSuccess: () => {
      discoverQuery.refetch()
      notification.success({
        message: t('content.discover.edit-success'),
      })
      navigate('/content/discover-uzbekistan')
    },
  })

  const toggleStatusMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: FormData }) =>
      editDiscovery(slug, data),
    onSuccess: () => {
      notification.success({
        message: t('content.discover.status-updated'),
      })
      discoverQuery.refetch()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => deleteDiscovery(slug),
    onSuccess: () => {
      discoverQuery.refetch()
      notification.success({
        message: t('content.discover.delete-success'),
      })
      setDeleteOpen(null)
    },
  })

  const discoverContextValue = useMemo<IDiscoverContext>(
    () => ({
      deleteOpen,
      setDeleteOpen,
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
        toggleStatusMutate: toggleStatusMutation.mutate,
        togglePending: toggleStatusMutation.isPending,
      },
      deleteDiscovery: {
        mutate: deleteMutation.mutate,
        isLoading: deleteMutation.isPending,
      },
    }),
    [
      discoverQuery.data,
      discoverQuery.isFetching,
      singleDiscoverQuery.data,
      singleDiscoverQuery.isFetching,
      createDiscoveryMutation.mutate,
      createDiscoveryMutation.isPending,
      deleteMutation.mutate,
      deleteMutation.isPending,
      editDiscoveryMutation.mutate,
      editDiscoveryMutation.isPending,
      toggleStatusMutation.mutate,
      toggleStatusMutation.isPending,
      deleteOpen,
      setDeleteOpen,
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
