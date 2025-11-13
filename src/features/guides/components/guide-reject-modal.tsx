import CustomModal from '@/features/billing/components/custom-madal'
import {
  Button,
  Flex,
  Form,
  Input,
  ModalProps,
  Radio,
  Space,
  Typography,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGuideContext } from '../hooks/use-guide-context'

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
    <CustomModal width={641} {...props}>
      <Flex vertical className="">
        <div className="flex flex-col items-center">
          <Flex vertical className="mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#F8F8FA]"></div>
            <Typography.Title level={2} className="">
              {t('guides.reject-text')}
            </Typography.Title>
          </Flex>
          <Typography.Text className="mb-6 text-base font-normal text-[#777E90]">
            {t('guides.reject-desc')}
          </Typography.Text>
        </div>
        <Radio.Group
          onChange={e => setValue(e.target.value)}
          value={value}
          className="mb-8"
        >
          <Space direction="vertical" className="gap-6">
            {reasons.map(val => (
              <Radio key={`report-reason-${val.id}`} value={val.id}>
                {val.text}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        {value === 4 && (
          <Form form={form} layout="vertical" name="complainForm">
            <Form.Item
              name="cancel_reason"
              label={t('guides.write-reason')}
              rules={[
                { required: true, message: 'Пожалуйста, введите детали.' },
              ]}
            >
              <Input.TextArea
                className="mb-6 h-[122px] resize-none p-4"
                placeholder={t('guides.reason')}
              />
            </Form.Item>
          </Form>
        )}

        <Flex gap={32}>
          <Button
            aria-label={t('buttons.cancel')}
            className="flex-1 border-none bg-secondary-light font-medium"
            size="large"
            type="default"
            onClick={props?.onCancel}
          >
            {t('common.cancel')}
          </Button>
          <Button
            aria-label={t('complain.complain')}
            size="large"
            type="primary"
            danger
            className="flex-1 text-white"
            onClick={handleComplain}
            loading={isPending}
          >
            {t('guides.cancel')}
          </Button>
        </Flex>
      </Flex>
    </CustomModal>
  )
}
