import { useMutation } from '@tanstack/react-query'
import { editTopDestination } from '../api'
import { App } from 'antd'
import { useNavigate, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import useTopDestinations from './use-top-destinations'

export function useEditTopDestination() {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { slug: destinationId } = useParams()
  const { refetch } = useTopDestinations()

  return useMutation({
    mutationKey: ['editTopDestination'],
    mutationFn: ({
      data,
      id,
      language,
    }: {
      id?: number | string
      data: FormData
      language: string
    }) => editTopDestination(destinationId! || id!, data, language),
    onSuccess: () => {
      notification.success({
        message: t('content.top_destinations.edit-success'),
      })
      refetch()
      navigate('/content/top-destinations')
    },
  })
}
