import { Button, Flex, Modal, Typography } from 'antd'

import type { ReactElement, ReactNode } from 'react'
import type { ModalProps } from 'antd'
import { twMerge } from 'tailwind-merge'
import CloseIcon from '@/components/icons/close-icon'

interface IProps extends ModalProps {
  modalIcon?: ReactNode
  modalTitle?: string
  modalDesc?: string
  modalClassName?: string
}

export default function CustomModal(props: IProps): ReactElement {
  const { children, modalTitle, modalDesc, modalIcon, modalClassName } = props

  return (
    <Modal
      classNames={{ content: 'p-[40px]' }}
      {...props}
      footer={null}
      closeIcon={null}
      title={null}
      centered
    >
      <Button
        shape="circle"
        className="rounded-2xl !border-[#B7BFD5]/20 text-[#777E90] absolute right-5 top-5 z-10 flex justify-center items-center"
        onClick={props.onCancel}
        aria-label="cancel"
      >
        <CloseIcon className="text-sm" />
      </Button>

      <Flex vertical gap={32}>
        {modalIcon && (
          <div className="h-[80px] rounded-3xl mx-auto w-[80px] text-secondary leading-[80px] bg-[#F8F8FA] flex items-center justify-center">
            {modalIcon}
          </div>
        )}

        {(modalTitle || modalDesc) && (
          <Flex vertical>
            {modalTitle && (
              <Typography.Title
                level={3}
                className={twMerge('text-center mb-4', modalClassName || '')}
              >
                {modalTitle}
              </Typography.Title>
            )}

            {modalDesc && (
              <Typography.Text className="text-center text-[18px] text-secondary">
                {modalDesc}
              </Typography.Text>
            )}
          </Flex>
        )}
        {children}
      </Flex>
    </Modal>
  )
}
