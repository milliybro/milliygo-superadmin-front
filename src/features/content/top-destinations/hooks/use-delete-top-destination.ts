import { useMutation, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { deleteTopDestination } from '../api'

export function useDeleteTopDestination(onClose?: () => void) {
  const queryClient = useQueryClient()
  const { notification } = App.useApp()
  const { t } = useTranslation()

  return useMutation({
    mutationKey: ['deleteTopDestinationImage'],
    mutationFn: (id: number) => deleteTopDestination(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['topDestinations'] })
      if (onClose) onClose()
      notification.success({
        message: t('content.top_destinations.image-delete-success'),
      })
    },
  })
}
