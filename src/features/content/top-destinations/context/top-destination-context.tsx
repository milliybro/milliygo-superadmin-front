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
import { deleteTopDestination } from '../api'
import { App } from 'antd'

interface ITopDestinationContextValue {
  topDestinations: {
    data?: ListResponse<ITopDestination[]>
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
  coords: [number, number][] | null
  setCoords: Dispatch<SetStateAction<[number, number][] | null>>
}

const TopDestinationsContext =
  createContext<ITopDestinationContextValue | null>(null)

export default function TopDestinationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [deleteOpen, setDeleteOpen] = useState<number | null>(null)
  const [coords, setCoords] = useState<[number, number][] | null>(null)

  const { notification } = App.useApp()
  const topDestinationsQuery = useQuery({
    queryKey: ['topDestinations'],
    queryFn: () => getTopDestinations(),
    enabled: true,
    placeholderData: data => data,
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

  const value = useMemo<ITopDestinationContextValue>(() => {
    return {
      topDestinations: {
        data: topDestinationsQuery.data,
        isFetching: topDestinationsQuery.isFetching,
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
      coords,
      setCoords,
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
    coords,
    setCoords,
  ])

  return (
    <TopDestinationsContext.Provider value={value}>
      {children}
    </TopDestinationsContext.Provider>
  )
}

export { TopDestinationsContext, TopDestinationProvider }
