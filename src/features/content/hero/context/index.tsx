import { createContext } from 'react'
import { IVideoBackground } from '../types'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createBackground,
  editBackground,
  getBackground,
  getBackgrounds,
} from '../api'
import { ListResponse } from '@/types'
import { App, notification } from 'antd'
import { useUploadedVideoStore } from '../store/uploaded-video-store'
import { useLocation, useParams } from 'react-router'

interface IHeroContext {
  videoLists: { data?: ListResponse<IVideoBackground[]>; isLoading: boolean }
  video: {
    data?: IVideoBackground
    isLoading: boolean
  }
  createBackground: {
    mutate: () => void
    isPending: boolean
  }
  editBackground: {
    mutate: (params: { is_active: boolean }) => void
    isPending: boolean
  }
}

const HeroContext = createContext<IHeroContext | null>(null)

function HeroProvider({ children }: { children: React.ReactNode }) {
  const { message } = App.useApp()
  const { uploadedVideo } = useUploadedVideoStore()
  const { slug } = useParams()
  const { pathname } = useLocation()

  const videoQuery = useQuery({
    queryKey: ['hero-backgrounds'],
    queryFn: getBackgrounds,
    enabled: !pathname.includes('edit'),
  })

  const singleQuery = useQuery({
    queryKey: ['single-bg', slug],
    queryFn: () => getBackground(slug as string),
    enabled: !!slug,
    throwOnError: true,
  })

  const createBackgroundMutation = useMutation({
    mutationFn: () => {
      if (!uploadedVideo?.video && !uploadedVideo?.preview) {
        return Promise.reject('')
      }

      const formdata = new FormData()

      formdata.append('video', uploadedVideo?.video)
      formdata.append('preview_image', uploadedVideo?.preview)
      formdata.append('is_active', 'false')

      return createBackground(formdata)
    },
    onSuccess: () => {
      message.success('Фон успешно создан')
    },
  })

  const editMutation = useMutation({
    mutationFn: (params: { is_active: boolean }) => {
      if (!uploadedVideo?.video && !uploadedVideo?.preview) {
        notification.error({
          message: 'Пожалуйста выберите видео',
        })
        return Promise.reject('')
      }

      const formData = new FormData()
      formData.append('video', uploadedVideo?.video)
      formData.append('preview_image', uploadedVideo?.preview)
      formData.append('is_active', String(params?.is_active))

      return editBackground(slug as string, formData)
    },
  })

  return (
    <HeroContext.Provider
      value={{
        videoLists: { data: videoQuery.data, isLoading: videoQuery.isLoading },
        video: {
          data: singleQuery.data,
          isLoading: singleQuery.isFetching,
        },
        createBackground: {
          mutate: createBackgroundMutation.mutate,
          isPending: createBackgroundMutation.isPending,
        },
        editBackground: {
          mutate: editMutation.mutate,
          isPending: editMutation.isPending,
        },
      }}
    >
      {children}
    </HeroContext.Provider>
  )
}

export default HeroProvider
export { HeroProvider, HeroContext }
