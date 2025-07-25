import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { createMapPoint, getRegion } from '../../api'
import { useNavigate, useParams } from 'react-router'
import { AxiosResponse } from 'axios'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

interface CountryMapContext {
  newCoords: { x: number; y: number }
  setNewCoords: Dispatch<SetStateAction<{ x: number; y: number }>>
  createMapPointMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      point_title: string
      destination: number
    },
    unknown
  >
}

const CountryMapContext = createContext<CountryMapContext | null>(null)

const CountryMapProvider = ({ children }: { children: ReactNode }) => {
  const [newCoords, setNewCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const navigate = useNavigate()

  const { setBreadCrumbs } = useBreadCrumbsStore()

  const { region } = useParams()

  const { data: regionData } = useQuery({
    queryKey: ['region', region],
    queryFn: () => getRegion(+region!),
    enabled: !!region,
    throwOnError: () => {
      navigate('/not-found')
      return false
    },
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/country-map' },
      {
        title: regionData?.name || 'Регион',
        href: `/content/country-map/${region}`,
      },
      {
        title: 'Создать точку на карте',
      },
    ])
  }, [regionData])

  const createMapPointMutation = useMutation({
    mutationFn: (values: { point_title: string; destination: number }) => {
      return createMapPoint({
        region: +region!,
        is_active: true,
        top_destination: values.destination,
        front_data: { ...newCoords, point_title: values.point_title },
      })
    },
  })

  return (
    <CountryMapContext.Provider
      value={{ newCoords, setNewCoords, createMapPointMutation }}
    >
      {children}
    </CountryMapContext.Provider>
  )
}

export default CountryMapProvider

export { CountryMapProvider, CountryMapContext }
