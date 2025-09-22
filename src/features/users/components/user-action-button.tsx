import { Avatar, Button, Input, message, Modal, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import useUserModalStore from '../store/user-modal-store'

import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteUser, updatePassword } from '../api'
import ConfirmationModal from '@/components/ui/confirmation-modal'
import ResetPasswordIcon from '@/components/icons/password-edit'
import { CopyOutlined, ReloadOutlined } from '@ant-design/icons'
import CloseIcon from '@/components/icons/close-icon'

const UserActionButton = ({ id, refetch }: { id: number; refetch: any }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const [deleteModal, setDeleteModal] = useState(false)
  const [resetModal, setResetModal] = useState(false)
  const [password, setPassword] = useState<string>('')

  const { openModal } = useUserModalStore(store => store)

  const editHandler = () => {
    navigate(pathname + '?edit=' + id)
    openModal()
  }
  const { mutate: createPassword, isPending: isUpdating } = useMutation({
    mutationFn: () => updatePassword(id),
    onSuccess: (res: { new_password: string }) => {
      console.log(res, 'ress')
      setPassword(res.new_password)
    },
  })

  const reset = () => {
    generatePassword()
    const params = new URLSearchParams(location.search)
    params.set('reset', String(id))
    navigate(`${pathname}?${params.toString()}`)
    setResetModal(true)
  }

  const generatePassword = () => {
    createPassword()
  }

  const copyPassword = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    message.success(t('common.copied'))
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      setDeleteModal(false)
      refetch()
    },
  })

  return (
    <div className="flex items-center gap-6">
      <Button
        type="link"
        className="px-0 text-base font-medium text-[#232E40]"
        onClick={reset}
      >
        <ResetPasswordIcon className="text-xl" />
      </Button>

      <Button
        type="link"
        className="px-0 text-base font-medium"
        onClick={editHandler}
      >
        <EditIcon className="text-xl" />
      </Button>

      <Button
        onClick={() => setDeleteModal(true)}
        type="link"
        danger
        className="px-0 text-base font-medium"
      >
        <DeleteIcon className="text-xl" />
      </Button>
      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('users-page.delete-modal')}
        subTitle={t('users-page.delete-modal-desc')}
        primaryBtnText={t('common.delete')}
        isLoading={isPending}
        action={() => mutate(id as any)}
      />

      <Modal
        closeIcon={<CloseIcon className="text-xl text-black" />}
        open={resetModal}
        onCancel={() => setResetModal(false)}
        footer={null}
        centered
        width={515}
      >
        <div className="flex w-full flex-col items-center p-5">
          <Avatar
            shape="circle"
            size={62}
            className="mb-4 border-[7px] border-[#EFF6FF] bg-[#DBEAFE]"
            icon={<ResetPasswordIcon className="text-[#3276FF]" />}
          />
          <div className="mb-6 flex flex-col gap-[10px] text-center">
            <Typography.Text className="text-2xl font-[700]">
              {t('common.reset-password')}
            </Typography.Text>
            <Typography.Text className="text-base font-[500] text-secondary">
              {t('common.reset-password-desc')}
            </Typography.Text>
          </div>
          <div className="mb-5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm">{t('hotels-page.password.title')}</p>
              <Button
                type="link"
                icon={<ReloadOutlined />}
                onClick={generatePassword}
                loading={isUpdating}
                className="m-0 p-0 text-sm font-[500]"
              >
                {t('common.reset')}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  size="large"
                  value={password}
                  readOnly
                  className="!rounded-r-none"
                />
                <Button
                  size="large"
                  type="default"
                  className="w-[120px] !rounded-l-none bg-[#F8F8FA]"
                  onClick={copyPassword}
                  icon={<CopyOutlined />}
                >
                  {t('common.copy')}
                </Button>
              </Space.Compact>
            </div>
          </div>
          <Button
            size="large"
            type="primary"
            className="bg-[#3276FF]"
            onClick={() => setResetModal(false)}
          >
            {t('common.close')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default UserActionButton
