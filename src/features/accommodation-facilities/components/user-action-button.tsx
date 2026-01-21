import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import useUserModalStore from '../store/user-modal-store'

// import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'

import CompactViewButton from '@/components/ui/compact-view-button'
import ConfirmationModal from '@/components/ui/confirmation-modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { confirmAccommodation, deleteUser } from '../api'

// interface IProps {
//   id?: any
// }

const UserActionButton = ({
  id,
  slug,
  refetch,
}: {
  id: number
  slug: string
  refetch: any
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [deleteModal, setDeleteModal] = useState(false)
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab')
  const queryClient = useQueryClient()

  const { openModal } = useUserModalStore(store => store)

  const editHandler = () => {
    navigate(pathname + '?edit=' + id)
    openModal()
  }
  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      setDeleteModal(false)
      refetch()
    },
  })

  const confirm = useMutation({
    mutationFn: () => confirmAccommodation(slug, { status: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels-data'] })

      // notification.success({
      //   message: editUserId
      //     ? t('fields.user-notification.edit.message')
      //     : t('fields.user-notification.add.message'),
      // })
    },
  })

  const reject = useMutation({
    mutationFn: () => confirmAccommodation(slug, { status: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels-data'] })

      // notification.success({
      //   message: editUserId
      //     ? t('fields.user-notification.edit.message')
      //     : t('fields.user-notification.add.message'),
      // })
    },
  })

  return (
    <div className="flex items-center gap-6">
      <CompactViewButton onClick={editHandler} />

      {/* <Button
        onClick={() => setDeleteModal(true)}
        type="link"
        danger
        className="text-base font-medium px-0"
      >
        <DeleteIcon className="text-xl" /> {t('common.delete')}
      </Button> */}
      {activeTab === '2' ? (
        <>
          <Button
            type="link"
            className="px-0 text-base font-medium"
            onClick={() => confirm.mutate()}
            loading={confirm.isPending}
          >
            {t('common.confirm')}
          </Button>
          <Button
            type="link"
            danger
            className="px-0 text-base font-medium"
            onClick={() => reject.mutate()}
            loading={reject.isPending}
          >
            {t('common.reject')}
          </Button>
        </>
      ) : null}
      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('users-page.delete-modal')}
        subTitle={t('users-page.delete-modal-desc')}
        primaryBtnText={t('common.delete')}
        isLoading={isDeleting}
        action={() => mutate()}
      />
    </div>
  )
}

export default UserActionButton
