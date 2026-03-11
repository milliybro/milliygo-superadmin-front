import { useTranslation } from 'react-i18next'
import { Avatar, Button, Flex, Modal, Space, Typography } from 'antd'

// import DeleteIcon from '../icons/delete'

import type { Dispatch, FC, SetStateAction } from 'react'

const { Text } = Typography

interface IProps {
  title: string
  subTitle: string
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  isLoading?: boolean
  action?: any
  icon: any
  danger?: boolean
  warn?: boolean
  primaryBtnText: string
}

const ConfirmationModal: FC<IProps> = ({
  open,
  title,
  subTitle,
  setOpen,
  isLoading,
  action,
  icon,
  danger,
  primaryBtnText,
  warn,
}) => {
  const { t } = useTranslation()
  const cancelHandler = () => {
    if (setOpen && !isLoading) {
      setOpen(false)
    }
  }

  return (
    <Modal
      open={open}
      centered
      width={515}
      onOk={cancelHandler}
      onCancel={cancelHandler}
      classNames={{
        content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
      }}
      closable={!isLoading}
      footer={null}
    >
      <Flex vertical align="center" className="text-center">
        <Avatar
          shape="circle"
          size={62}
          className={`mb-5 border-[7px] ${
            danger
              ? 'border-[#FEF2F2] bg-[#FEE2E2]'
              : 'border-[#EFF6FF] bg-[#DBEAFE]'
          } ${
            warn
              ? 'border-[#EFF6FF] bg-[#DBEAFE]'
              : 'border-[#EFF6FF] bg-[#DBEAFE]'
          }`}
          icon={
            icon
              ? icon({
                  className: danger
                    ? 'text-danger text-2xl'
                    : 'text-primary text-2xl',
                })
              : icon({
                  className: warn
                    ? 'text-warn text-2xl'
                    : 'text-primary text-2xl',
                })
          }
        />
        <Text className="mb-[10px] text-2xl font-bold leading-[30.6px] text-primary-dark dark:text-white">
          {title}
        </Text>
        <Text className="mb-[20px] leading-[25.6px] text-secondary">
          {subTitle}
        </Text>
        <Space>
          <Button
            className="font-semibold"
            onClick={cancelHandler}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button
            className="bg-primary-dark font-semibold text-white"
            loading={isLoading ?? undefined}
            onClick={action ?? undefined}
          >
            {primaryBtnText}
          </Button>
        </Space>
      </Flex>
    </Modal>
  )
}

export default ConfirmationModal
