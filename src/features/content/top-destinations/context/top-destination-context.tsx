import { ListResponse } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react'
import { getRegions, getTopDestinations } from '../../api'
import { IRegion, ITopDestination } from '../../types'
import {
  createTopDestination,
  deleteTopDestination,
  editTopDestination,
  getTopDestination,
} from '../api'
import { App } from 'antd'
import { useLocation, useNavigate, useParams } from 'react-router'
import queryString from 'query-string'

interface ITopDestinationContextValue {
  topDestinations: {
    data?: ListResponse<ITopDestination[]>
    refetch: () => void
    isFetching: boolean
  }
  singleTopDestination: {
    data?: ITopDestination
    isFetching: boolean
  }
  deleteOpen: number | null
  setDeleteOpen: Dispatch<SetStateAction<number | null>>
  deleteTopDestination: {
    mutate: (id: number | string) => void
    isLoading: boolean
  }
  regions: {
    data?: ListResponse<IRegion[]>
    isFetching: boolean
  }
  createTopDestination: {
    mutate: (data: FormData) => void
    isLoading: boolean
  }
  editTopDestination: {
    mutate: (params: { id?: number | string; data: FormData }) => void
    isLoading: boolean
  }
}

const TopDestinationsContext =
  createContext<ITopDestinationContextValue | null>(null)

export default function TopDestinationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [deleteOpen, setDeleteOpen] = useState<number | null>(null)
  const navigate = useNavigate()
  const { search } = useLocation()
  const queries = useMemo(() => queryString.parse(search), [search])

  const { slug: destinationId } = useParams()

  const { notification } = App.useApp()

  const topDestinationsQuery = useQuery({
    queryKey: ['topDestinations', queries],
    queryFn: () => getTopDestinations({ ...queries, page_size: 10 }),
    enabled: true,
    placeholderData: data => data,
  })

  const singleTopDestinationQuery = useQuery({
    queryKey: ['topDestinations', 'single', destinationId],
    queryFn: () => getTopDestination(destinationId as string),
    enabled: !!destinationId,
    throwOnError: true,
  })

  const deleteTopDestinationMutation = useMutation({
    mutationFn: (id: number | string) => deleteTopDestination(id),
    onSuccess: () => {
      topDestinationsQuery.refetch()
      notification.success({
        message: 'Направление успешно удалено',
      })
      setDeleteOpen(null)
    },
  })

  const regionsQuery = useQuery({
    queryKey: ['regions'],
    queryFn: () => getRegions({ page_size: 14 }),
    enabled: true,
  })

  const createMutation = useMutation({
    mutationFn: (data: FormData) => createTopDestination(data),
    onSuccess: () => {
      notification.success({
        message: 'Направление успешно создано',
      })
      topDestinationsQuery.refetch()
      navigate('/content/top-destinations')
    },
  })

  const editMutation = useMutation({
    mutationKey: ['editTopDestination'],
    mutationFn: ({ data, id }: { id?: number | string; data: FormData }) =>
      editTopDestination(destinationId! || id!, data),
    onSuccess: () => {
      notification.success({
        message: 'Направление успешно обновлено',
      })
      topDestinationsQuery.refetch()
      navigate('/content/top-destinations')
    },
  })

  const value = useMemo<ITopDestinationContextValue>(() => {
    return {
      topDestinations: {
        data: topDestinationsQuery.data,
        isFetching: topDestinationsQuery.isFetching,
        refetch: topDestinationsQuery.refetch,
      },
      deleteOpen,
      setDeleteOpen,
      deleteTopDestination: {
        mutate: deleteTopDestinationMutation.mutate,
        isLoading: deleteTopDestinationMutation.isPending,
      },
      regions: {
        data: regionsQuery.data,
        isFetching: regionsQuery.isFetching,
      },
      createTopDestination: {
        mutate: createMutation.mutate,
        isLoading: createMutation.isPending,
      },
      editTopDestination: {
        mutate: editMutation.mutate,
        isLoading: editMutation.isPending,
      },
      singleTopDestination: {
        data: singleTopDestinationQuery.data,
        isFetching: singleTopDestinationQuery.isFetching,
      },
    }
  }, [
    topDestinationsQuery.data,
    topDestinationsQuery.isFetching,
    deleteOpen,
    setDeleteOpen,
    deleteTopDestinationMutation.isPending,
    deleteTopDestinationMutation.mutate,
    regionsQuery.data,
    regionsQuery.isFetching,
    createMutation.mutate,
    createMutation.isPending,
    singleTopDestinationQuery.data,
    singleTopDestinationQuery.isFetching,
    editMutation.mutate,
    editMutation.isPending,
  ])

  return (
    <TopDestinationsContext.Provider value={value}>
      {children}
    </TopDestinationsContext.Provider>
  )
}

export { TopDestinationsContext, TopDestinationProvider }
