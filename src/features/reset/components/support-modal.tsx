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
          className="absolute top-[10px] right-[10px]"
          icon={<CloseIcon className="text-[16px] text-white" />}
          onClick={() => setOpen(false)}
        />
        <div className="text-white items-center gap-6 flex flex-col">
          <div className="size-[64px] shrink-0 border-[7px] border-border/10 flex items-center justify-center rounded-full">
            <props.icon className="text-white text-[26px]" />
          </div>

          <div className="flex flex-col text-center gap-4">
            <span className="text-[26px] text-white font-semibold">
              {title}
            </span>
            <span className="text-[16px] text-white font-light">
              {description}
            </span>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <a
              href="tel:+998 71 298 74 84"
              className="border border-[#3F416B] rounded-[16px] gap-[10px] p-6 bg-[#232E40] flex items-center"
            >
              <div className="size-[48px] shrink-0 bg-[#1E293B] flex items-center justify-center rounded-[8px]">
                <CallRingingIcon />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[24px] leading-[28px] font-semibold">
                  +998 71 298 74 84
                </span>
                <span className="text-success">
                  {t('common.support-service')}
                </span>
              </div>
            </a>
            <a
              href="tel:+998 71 298 74 84"
              className="border border-[#3F416B] rounded-[16px] gap-[10px] p-6 bg-[#232E40] flex items-center"
            >
              <div className="size-[48px] shrink-0 bg-[#1E293B] flex items-center justify-center rounded-[8px]">
                <CallRingingIcon />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[24px] leading-[28px] font-semibold">
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
