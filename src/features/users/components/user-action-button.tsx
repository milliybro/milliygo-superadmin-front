import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import useUserModalStore from '../store/user-modal-store'

import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'

import { useState, type FC } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteUser } from '../api'
import ConfirmationModal from '@/components/ui/confirmation-modal'

interface IProps {
  id?: any
}

const UserActionButton = ({ id, refetch }: { id: number; refetch: any }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [deleteModal, setDeleteModal] = useState(false)

  const { openModal } = useUserModalStore(store => store)

  const editHandler = () => {
    navigate(pathname + '?edit=' + id)
    openModal()
  }
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      setDeleteModal(false)
      refetch()
    },
    onError: () => {},
  })

  return (
    <div className="flex items-center gap-6">
      <Button
        type="link"
        className="text-[16px] font-medium px-0"
        onClick={editHandler}
      >
        <EditIcon className="text-[20px]" /> {t('common.edit')}
      </Button>

      <Button
        onClick={() => setDeleteModal(true)}
        type="link"
        danger
        className="text-[16px] font-medium px-0"
      >
        <DeleteIcon className="text-[20px]" /> {t('common.delete')}
      </Button>
      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('users-page.delete-modal')}
        subTitle={t('users-page.delete-modal-desc')}
        primaryBtnText={t('common.delete')}
        isLoading={isDeleting}
        action={() => mutate(id as any)}
      />
    </div>
  )
}

export default UserActionButton
