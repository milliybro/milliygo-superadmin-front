import { ListResponse } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { App } from 'antd'
import { createContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import {
  createBackground,
  deleteBackground,
  editBackground,
  getBackground,
  getBackgrounds,
} from '../api'
import { useUploadedVideoStore } from '../store/uploaded-video-store'
import { IVideoBackground } from '../types'
import { useTranslation } from 'react-i18next'

interface IHeroContext {
  videoLists: { data?: ListResponse<IVideoBackground[]>; isLoading: boolean }
  showDeleteModal: number | null
  setShowDeleteModal: (value: number | null) => void
  video: {
    data?: IVideoBackground
    isLoading: boolean
  }
  createBackground: {
    mutate: () => void
    isPending: boolean
    isSuccess: boolean
  }
  editBackground: {
    mutate: (params: { is_active: boolean; id?: number }) => void
    isPending: boolean
  }
  deleteBackground: {
    mutate: (id: number) => void
    isPending: boolean
  }
}

const HeroContext = createContext<IHeroContext | null>(null)

function HeroProvider({ children }: { children: React.ReactNode }) {
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null)
  const { notification } = App.useApp()
  const { uploadedVideo } = useUploadedVideoStore()
  const { slug } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

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
      notification.success({ message: t('content.hero.create-success') })
      videoQuery.refetch()
    },
  })

  const editMutation = useMutation({
    mutationFn: (params: { is_active: boolean; id?: number }) => {
      // if (!uploadedVideo?.video && !uploadedVideo?.preview) {
      //   notification.error({
      //     message: 'Пожалуйста выберите видео',
      //   })
      //   return Promise.reject('')
      // }

      const formData = new FormData()
      if (uploadedVideo?.video) formData.append('video', uploadedVideo?.video)
      if (uploadedVideo?.preview)
        formData.append('preview_image', uploadedVideo?.preview)
      formData.append('is_active', String(params?.is_active))

      return editBackground(params?.id || (slug as string), formData)
    },
    onSuccess: () => {
      videoQuery.refetch()
      notification.success({
        message: t('content.hero.edit-success'),
      })
      navigate('/content/main')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBackground,
    onSuccess: () => {
      notification.success({
        message: t('content.hero.delete-success'),
      })
      setShowDeleteModal(null)
      videoQuery.refetch()
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
          isSuccess: createBackgroundMutation.isSuccess,
        },
        editBackground: {
          mutate: editMutation.mutate,
          isPending: editMutation.isPending,
        },
        deleteBackground: {
          mutate: deleteMutation.mutate,
          isPending: deleteMutation.isPending,
        },
        showDeleteModal,
        setShowDeleteModal,
      }}
    >
      {children}
    </HeroContext.Provider>
  )
}

export default HeroProvider
export { HeroContext, HeroProvider }
