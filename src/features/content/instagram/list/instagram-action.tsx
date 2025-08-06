import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, notification } from 'antd'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteInstagramContent } from '../../api'

import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'
import DeleteModal from '../../components/delete-modal'

import type { FC } from 'react'
import type { IInstagramContent } from '../../types'

const InstagramAction: FC<IInstagramContent> = props => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const deleteMutate = useMutation({
    mutationFn: () => deleteInstagramContent(props?.id),
    onSuccess: () => {
      // if (data?.results.length === 1) {
      //   setCurrentPage(1)
      // }

      setDeleteOpen(false)
      notification.success({ message: 'Контент успешно удалён' })
      queryClient.invalidateQueries({ queryKey: ['instagram-contents'] })
    },
  })

  const handleDelete = () => {
    setDeleteOpen(true)
  }

  return (
    <>
      <div className="flex items-center text-base font-medium">
        <Button type="link" onClick={() => navigate(`edit/${props?.id}`)}>
          <EditIcon className="text-xl" /> {t('Редактировать')}
        </Button>
        <Button type="link" danger onClick={handleDelete}>
          <DeleteIcon className="text-xl" /> {t('Удалить')}
        </Button>
      </div>

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={() => deleteMutate.mutate()}
        isLoading={deleteMutate?.isPending}
        title={t('Удалить контент?')}
        description={t(
          'Вы уверены, что хотите удалить этот Instagram контент?',
        )}
      />
    </>
  )
}

export default InstagramAction
