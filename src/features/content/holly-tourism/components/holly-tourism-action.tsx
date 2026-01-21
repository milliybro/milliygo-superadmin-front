import type { FC } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, notification } from 'antd'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'
import DeleteModal from '@/features/content/components/delete-modal'
import { IHollyTourism } from '@/features/content/holly-tourism/types'
import { deleteHollyTourism } from '@/features/content/holly-tourism/api'

const HollyTourismAction: FC<IHollyTourism> = props => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const deleteMutate = useMutation({
    mutationFn: () => deleteHollyTourism(props?.id),
    onSuccess: () => {
      setDeleteOpen(false)
      notification.success({
        message: t('content.holly-tourism.delete-success'),
      })
      queryClient.invalidateQueries({ queryKey: ['holly-tourism'] })
    },
  })

  const handleDelete = () => {
    setDeleteOpen(true)
  }

  return (
    <>
      <div className="flex items-center text-base font-medium">
        <Button type="link" onClick={() => navigate(`edit/${props.id}`)}>
          <EditIcon className="text-xl" /> {t('common.edit')}
        </Button>
        <Button type="link" danger onClick={handleDelete}>
          <DeleteIcon className="text-xl" /> {t('common.delete')}
        </Button>
      </div>

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={() => deleteMutate.mutate()}
        isLoading={deleteMutate?.isPending}
        title={t('content.holly-tourism.delete-title')}
        description={t('content.holly-tourism.delete-desc')}
      />
    </>
  )
}

export default HollyTourismAction
