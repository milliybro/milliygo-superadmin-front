import { useMutation } from '@tanstack/react-query'
import { createTopDestination } from '../api'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export function useCreateTopDestination() {
  const { notification } = App.useApp()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: FormData) => createTopDestination(data),
    onSuccess: () => {
      notification.success({
        message: t('content.top_destinations.create-success'),
      })
      // topDestinationsQuery.refetch()
      navigate('/content/top-destinations')
    },
  })
}
