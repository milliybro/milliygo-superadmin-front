import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react'

interface ITopDestinationContextValue {
  deleteOpen: number | null
  setDeleteOpen: Dispatch<SetStateAction<number | null>>
}

const TopDestinationsContext =
  createContext<ITopDestinationContextValue | null>(null)

export default function TopDestinationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [deleteOpen, setDeleteOpen] = useState<number | null>(null)

  const value = useMemo<ITopDestinationContextValue>(() => {
    return {
      deleteOpen,
      setDeleteOpen,
    }
  }, [deleteOpen, setDeleteOpen])

  return (
    <TopDestinationsContext.Provider value={value}>
      {children}
    </TopDestinationsContext.Provider>
  )
}

export { TopDestinationProvider, TopDestinationsContext }
