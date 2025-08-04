import { Button, Modal, Typography } from 'antd'

import DeleteIcon from '@/components/icons/delete'
import { CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface IProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  onDelete?: () => void
  isLoading?: boolean
}

export default function DeleteModal({
  open,
  onClose,
  title,
  description,
  onDelete,
  isLoading,
}: IProps) {
  const { t } = useTranslation()
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={<CloseOutlined className="text-black" />}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="mt-5 flex size-[62px] items-center justify-center rounded-full border-[7px] border-[#FEF2F2] bg-[#FEE2E2]">
          <DeleteIcon className="text-xl text-danger" />
        </div>
        <Typography.Title
          level={4}
          className="mb-0 text-center text-2xl font-bold"
        >
          {title || 'Удалить фон?'}
        </Typography.Title>
        <Typography.Text className="text-center text-base text-secondary">
          {description ||
            'Подтвердите, что вы действительно хотите удалить данного контекста?'}
        </Typography.Text>
        <div className="flex items-center justify-center gap-5">
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button
            type="primary"
            className="bg-primary-dark"
            onClick={onDelete}
            loading={isLoading}
          >
            {t('common.delete')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
