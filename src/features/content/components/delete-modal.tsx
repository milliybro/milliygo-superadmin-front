import DeleteIcon from '@/components/icons/delete'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Modal, Typography } from 'antd'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title?: string
  description?: string
  onDelete?: () => void
  isLoading?: boolean
}

export default function DeleteModal({
  open,
  setOpen,
  title,
  description,
  onDelete,
  isLoading,
}: IProps) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      closeIcon={<CloseOutlined className="text-black" />}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="border-[#FEF2F2 mt-5 flex size-[62px] items-center justify-center rounded-full border-[7px] bg-[#FEE2E2]">
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
            'Подтвердите, что вы действительно хотите удалить данного контекстa?'}
        </Typography.Text>
        <div className="flex items-center justify-center gap-5">
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button
            type="primary"
            className="bg-primary-dark"
            onClick={onDelete}
            loading={isLoading}
          >
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
