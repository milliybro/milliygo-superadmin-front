import { useMutation } from '@tanstack/react-query'
import { deleteHollyTourismImage } from '../api'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'

export function useDeleteHollyTourismImage() {
  const { notification } = App.useApp()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (id: number) => deleteHollyTourismImage(id),
    onSuccess: () => {
      notification.success({
        message: t('content.top_destinations.image-delete-success'),
      })
    },
  })
}
