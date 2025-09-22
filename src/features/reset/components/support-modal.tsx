import { Button, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { cloneElement, isValidElement, useState } from 'react'

import CloseIcon from '@/components/icons/close-icon'
import CallRingingIcon from '@/components/icons/call-ringing'

import type { FC } from 'react'
import type { ISupportModalProps } from '../types'

const SupportModal: FC<ISupportModalProps> = props => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const { title, description, children } = props

  const handleClick = () => setOpen(true)

  return (
    <>
      {isValidElement(children)
        ? cloneElement(children, { onClick: handleClick })
        : children}

      <Modal
        centered
        open={open}
        width={569}
        footer={null}
        closeIcon={null}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        classNames={{
          wrapper: 'backdrop-blur-sm',
          content:
            '!bg-[#1E293B] relative !p-[100px] !border !border-[#3F416B]',
        }}
      >
        <Button
          type="text"
          className="absolute right-[10px] top-[10px]"
          icon={<CloseIcon className="text-base text-white" />}
          onClick={() => setOpen(false)}
        />
        <div className="flex flex-col items-center gap-6 text-white">
          <div className="flex size-[64px] shrink-0 items-center justify-center rounded-full border-[7px] border-border/10">
            <props.icon className="text-2xl text-white" />
          </div>

          <div className="flex flex-col gap-4 text-center">
            <span className="text-2xl font-semibold text-white">{title}</span>
            <span className="text-base font-light text-white">
              {description}
            </span>
          </div>

          <div className="flex w-full flex-col gap-4">
            <a
              href="tel:+998 71 298 74 84"
              className="flex items-center gap-[10px] rounded-[16px] border border-[#3F416B] bg-[#232E40] p-6"
            >
              <div className="flex size-[48px] shrink-0 items-center justify-center rounded-[8px] bg-[#1E293B]">
                <CallRingingIcon />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold leading-[28px]">
                  +998 71 298 74 84
                </span>
                <span className="text-success">
                  {t('common.support-service')}
                </span>
              </div>
            </a>
            <a
              href="tel:+998 71 298 74 84"
              className="flex items-center gap-[10px] rounded-[16px] border border-[#3F416B] bg-[#232E40] p-6"
            >
              <div className="flex size-[48px] shrink-0 items-center justify-center rounded-[8px] bg-[#1E293B]">
                <CallRingingIcon />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold leading-[28px]">
                  +998 71 298 74 84
                </span>
                <span className="text-success">
                  {t('common.additional-number')}
                </span>
              </div>
            </a>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default SupportModal
