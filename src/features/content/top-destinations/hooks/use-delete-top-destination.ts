import { useMutation } from '@tanstack/react-query'
import { deleteTopDestinationImage } from '../api'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'

export function useDeleteTopDestination() {
  const { notification } = App.useApp()
  const { t } = useTranslation()

  return useMutation({
    mutationKey: ['deleteTopDestinationImage'],
    mutationFn: (id: number) => deleteTopDestinationImage(id),
    onSuccess: () => {
      notification.success({
        message: t('content.top_destinations.image-delete-success'),
      })
    },
  })
}
