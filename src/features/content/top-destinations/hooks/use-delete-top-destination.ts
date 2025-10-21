import { useMutation } from '@tanstack/react-query'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { deleteTopDestination } from '../api'

export function useDeleteTopDestination() {
  const { notification } = App.useApp()
  const { t } = useTranslation()

  return useMutation({
    mutationKey: ['deleteTopDestinationImage'],
    mutationFn: (id: number) => deleteTopDestination(id),
    onSuccess: () => {
      notification.success({
        message: t('content.top_destinations.image-delete-success'),
      })
    },
  })
}
