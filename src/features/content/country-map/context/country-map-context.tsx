import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { ListResponse } from '@/types'
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import { notification } from 'antd'
import { AxiosResponse } from 'axios'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router'
import {
  createMapPoint,
  deleteRegionMapPoint,
  getRegion,
  getRegionMapPoints,
  getTopDestinations,
  updateRegionMapPoint,
} from '../../api'
import { IRegionMapPoint } from '../../types'

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
  updateMapPointMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      point_title: string
      destination: number
    },
    unknown
  >
  deleteMapPointMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    number,
    unknown
  >
  topDestinationOptions?: {
    label: string
    value: number
  }[]

  points?: ListResponse<IRegionMapPoint[]>
}

const CountryMapContext = createContext<CountryMapContext | null>(null)

const CountryMapProvider = ({ children }: { children: ReactNode }) => {
  const [newCoords, setNewCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { setBreadCrumbs } = useBreadCrumbsStore()

  const { region } = useParams()

  const [searchParams] = useSearchParams()
  const pointId = searchParams.get('id')

  const { data: regionData } = useQuery({
    queryKey: ['region', region],
    queryFn: () => getRegion(+region!),
    enabled: !!region,
    throwOnError: () => {
      navigate('/not-found')
      return false
    },
  })

  const { data: points } = useQuery({
    queryKey: ['region-spots', region, pathname],
    queryFn: () => getRegionMapPoints({ region_id: +region! }),
    enabled: !!region,
    gcTime: 0,
  })

  useEffect(() => {
    const editingPoint = points?.results?.find(
      point => point.id === +(pointId || NaN),
    )

    if (editingPoint) {
      setNewCoords({
        x: editingPoint.front_data.x,
        y: editingPoint.front_data.y,
      })
    }
  }, [points])

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/country-map' },
      {
        title: regionData?.name || 'Регион',
        href: `/content/country-map/${region}`,
      },
      {
        title: pathname?.includes('create')
          ? 'Создать точку на карте'
          : 'Редактировать точку на карте',
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
    onSuccess: () => {
      notification.success({
        message: 'Точка успешно создана',
      })
      navigate(`/content/country-map/${region}`)
    },
  })

  const updateMapPointMutation = useMutation({
    mutationFn: (values: { point_title: string; destination: number }) =>
      updateRegionMapPoint({
        region: +region!,
        id: +pointId!,
        top_destination: values?.destination,
        front_data: {
          ...newCoords,
          point_title: values?.point_title || '',
        },
      }),
    onSuccess: () => {
      console.log('success')
      notification.success({
        message: 'Точка успешно обновлена',
      })
      navigate(`/content/country-map/${region}`)
    },
  })

  const { data: topDestinationOptions } = useQuery({
    queryKey: ['destinations', region],
    queryFn: () => getTopDestinations({ region }),
    enabled: true,
    select: data =>
      data?.results?.map(item => ({ label: item?.title, value: item?.id })) ||
      [],
  })

  const deleteMapPointMutation = useMutation({
    mutationFn: deleteRegionMapPoint,
  })

  return (
    <CountryMapContext.Provider
      value={{
        newCoords,
        setNewCoords,
        createMapPointMutation,
        updateMapPointMutation,
        deleteMapPointMutation,
        topDestinationOptions,
        points,
      }}
    >
      {children}
    </CountryMapContext.Provider>
  )
}

export default CountryMapProvider

export { CountryMapContext, CountryMapProvider }
