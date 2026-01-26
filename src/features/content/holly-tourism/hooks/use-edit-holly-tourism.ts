import { useMutation } from '@tanstack/react-query'
import { editHollyTourism } from '../api'
import { App } from 'antd'
import { useNavigate, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import useHollyTourism from './use-holly-tourism'

export function useEditHollyTourism() {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { slug } = useParams()
  const { refetch } = useHollyTourism()

  return useMutation({
    mutationKey: ['edit-holly-tourism'],
    mutationFn: ({
      data,
      id,
      language,
    }: {
      id?: number | string
      data: FormData
      language: string
    }) => editHollyTourism(slug! || id!, data, language),
    onSuccess: () => {
      notification.success({
        message: t('content.holly-tourism.edit-success'),
      })
      refetch()
      navigate('/content/holly-tourism')
    },
  })
}
