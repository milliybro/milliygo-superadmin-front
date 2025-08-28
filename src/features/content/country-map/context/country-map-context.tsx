import { ListResponse } from '@/types'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
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
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router'
import {
  createMapPoint,
  deleteRegionMapPoint,
  getRegion,
  getRegionMapPoints,
  getTopDestinations,
  updateRegionMapPoint,
} from '../../api'
import { IRegion, IRegionMapPoint } from '../../types'

interface CountryMapContext {
  newCoords: { x: number; y: number }
  setNewCoords: Dispatch<SetStateAction<{ x: number; y: number }>>
  deletingId: number | null
  setDeletingId: Dispatch<SetStateAction<number | null>>
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
  pointsQuery: UseQueryResult<ListResponse<IRegionMapPoint[]>, Error>
  regionData?: IRegion
}

const CountryMapContext = createContext<CountryMapContext | null>(null)

const CountryMapProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation()
  const [newCoords, setNewCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { region } = useParams()

  const { slug } = useParams()
  const pointId = Number(slug)

  const { data: regionData } = useQuery({
    queryKey: ['region', region],
    queryFn: () => getRegion(+region!),
    enabled: !!region,
    throwOnError: () => {
      navigate('/not-found')
      return false
    },
  })

  const pointsQuery = useQuery({
    queryKey: ['region-spots', region, pathname],
    queryFn: () => getRegionMapPoints({ region_id: +region! }),
    enabled: !!region,
    gcTime: 0,
  })

  useEffect(() => {
    const points = pointsQuery.data
    const editingPoint = points?.results?.find(
      point => point.id === +(pointId || NaN),
    )

    if (editingPoint) {
      setNewCoords({
        x: editingPoint.front_data.x,
        y: editingPoint.front_data.y,
      })
    }
  }, [pointsQuery.data])

  const createMapPointMutation = useMutation({
    mutationFn: (values: {
      point_title: string
      destination: number
      is_active?: boolean
    }) => {
      return createMapPoint({
        region: +region!,
        is_active: values?.is_active ?? true,
        top_destination: values.destination,
        front_data: { ...newCoords, point_title: values.point_title },
      })
    },
    onSuccess: () => {
      notification.success({
        message: t('content.country-map.add-success'),
      })
      navigate(`/content/country-map/${region}`)
    },
  })

  const updateMapPointMutation = useMutation({
    mutationFn: (values: {
      point_title: string
      destination: number
      is_active?: boolean
    }) => {
      console.log(values)
      return updateRegionMapPoint({
        region: +region!,
        id: +pointId!,
        top_destination: values?.destination,
        is_active: values?.is_active,
        front_data: {
          ...newCoords,
          point_title: values?.point_title || '',
        },
      })
    },
    onSuccess: () => {
      console.log('success')
      notification.success({
        message: t('content.country-map.edit-success'),
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
    onSuccess: () => {
      pointsQuery.refetch()
      setDeletingId(null)
      notification.success({
        message: t('content.country-map.delete-success'),
      })
    },
  })

  return (
    <CountryMapContext.Provider
      value={{
        newCoords,
        setNewCoords,
        deletingId,
        setDeletingId,
        createMapPointMutation,
        updateMapPointMutation,
        deleteMapPointMutation,
        topDestinationOptions,
        regionData,
        pointsQuery,
      }}
    >
      {children}
    </CountryMapContext.Provider>
  )
}

export default CountryMapProvider

export { CountryMapContext, CountryMapProvider }
