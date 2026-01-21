import { useMutation } from '@tanstack/react-query'
import { createHollyTourism } from '../api'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import useHollyTourism from './use-holly-tourism'

export function useCreateHollyTourism() {
  const { notification } = App.useApp()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { refetch } = useHollyTourism()

  return useMutation({
    mutationFn: (data: FormData) => createHollyTourism(data),
    onSuccess: () => {
      notification.success({
        message: t('content.holly-tourism.add-success'),
      })
      refetch()
      navigate('/content/holly-tourism')
    },
  })
}
