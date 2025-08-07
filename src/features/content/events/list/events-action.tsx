import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, notification } from 'antd'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteEvent } from '../../api'

import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'
import DeleteModal from '../../components/delete-modal'

import type { FC } from 'react'
import type { IEvent } from '../../types'

const EventsAction: FC<IEvent> = props => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const deleteMutate = useMutation({
    mutationFn: () => deleteEvent(props?.slug),
    onSuccess: () => {
      // if (data?.results.length === 1) {
      //   setCurrentPage(1)
      // }

      setDeleteOpen(false)
      notification.success({ message: 'Мероприятие успешно удалено' })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const handleDelete = () => {
    setDeleteOpen(true)
  }

  return (
    <>
      <div className="flex items-center text-base font-medium">
        <Button type="link" onClick={() => navigate(`edit/${props.slug}`)}>
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
        title={t('content.events.delete-modal-title')}
        description={t('content.events.delete-modal-description')}
      />
    </>
  )
}

export default EventsAction
