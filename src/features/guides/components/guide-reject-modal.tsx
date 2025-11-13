import AlertIcon from '@/components/icons/alert'
import CloseIcon from '@/components/icons/close-icon'
import { Button, Flex, Form, Input, ModalProps, Radio, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { useGuideContext } from '../hooks/use-guide-context'
import CustomModal from './custom-madal'

interface GuideRejectModalProps extends ModalProps {
  guideId: number | null
}

export default function GuideRejectModal({
  guideId,
  ...props
}: GuideRejectModalProps) {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [value, setValue] = useState(1)
  const {
    updateGuide: { mutate, isPending },
  } = useGuideContext()

  const reasons = [
    { id: 1, text: 'Content 1' },
    { id: 4, text: 'Другая причина' },
  ]

  const handleComplain = () => {
    if (!guideId) return

    let reason = ''

    const selectedReason = reasons.find(r => r.id === value)

    if (value === 4) {
      reason = form.getFieldValue('cancel_reason') || ''
    } else {
      reason = selectedReason?.text || ''
    }

    if (!reason) {
      form.validateFields()
      return
    }

    mutate({ guide_status: 'rejected', rejected_reason: reason, id: guideId })
  }

  return (
    <CustomModal
      width={515}
      {...props}
      closeIcon={
        <Button icon={<CloseIcon className="text-lg text-black" />}>asd</Button>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div className="m-[7px] mb-5 box-content flex size-[55px] items-center justify-center rounded-full bg-danger/15 outline outline-[7px] outline-danger/5">
          <AlertIcon className="text-[26px] text-danger" />
        </div>
        <Typography.Title level={2} className="mb-[10px] text-2xl">
          {t('guides.reject-text')}
        </Typography.Title>
        <Typography.Text className="text-base font-normal text-[#777E90]">
          {t('guides.reject-desc')}
        </Typography.Text>
      </div>

      <div className="flex flex-col gap-[5px]">
        {reasons.map(val => {
          const checked = val.id === value
          return (
            <label
              htmlFor={`report-reason-${val.id}`}
              key={`report-reason-${val.id}`}
              className={twMerge(
                'flex cursor-pointer items-center justify-between rounded-lg px-3 py-[0.625rem] hover:bg-secondary-dark/5',
                checked && 'bg-secondary/5',
              )}
            >
              <span className="text-base text-black">{val.text}</span>
              <Radio
                id={`report-reason-${val.id}`}
                value={val.id}
                onChange={e => setValue(e.target.value)}
                checked={checked}
              ></Radio>
            </label>
          )
        })}
      </div>

      {value === 4 && (
        <Form
          form={form}
          layout="vertical"
          name="complainForm"
          requiredMark={false}
        >
          <Form.Item
            name="cancel_reason"
            label={t('guides.write-reason')}
            rules={[{ required: true, message: 'Пожалуйста, введите детали.' }]}
          >
            <Input.TextArea
              className="h-[122px] resize-none p-4"
              placeholder={t('guides.reason')}
            />
          </Form.Item>
        </Form>
      )}

      <Flex gap={16} className="self-center">
        <Button
          aria-label={t('buttons.cancel')}
          className="text-[15px] font-medium"
          onClick={props?.onCancel}
        >
          {t('common.cancel')}
        </Button>
        <Button
          aria-label={t('complain.complain')}
          type="primary"
          className="bg-primary-dark text-[15px] font-medium hover:bg-primary-dark/80"
          onClick={handleComplain}
          loading={isPending}
        >
          {t('guides.cancel')}
        </Button>
      </Flex>
    </CustomModal>
  )
}
