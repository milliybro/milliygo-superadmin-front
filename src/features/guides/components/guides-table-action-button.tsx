import CancelIcon from '@/components/icons/cancel-icon'
import CheckIcon from '@/components/icons/check-icon'
import EyeIcon from '@/components/icons/eye'
import { useMutation } from '@tanstack/react-query'
import {
  Button,
  Flex,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
} from 'antd'
import { memo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { updateGuide } from '../api'
import useGuideModalStore from '../store/hotel-modal-store'
import { IGuideStatus } from '../types'
import CustomModal from './custom-madal'

interface IProps {
  id: number
  type?: IGuideStatus
  refetch?: () => void
}

type GuideUpdatePayload = {
  guide_status: IGuideStatus
  rejected_reason?: string
}

const GuidesTableActionButton: FC<IProps> = ({ id, type, refetch }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [searchParams, setSearchParams] = useSearchParams()
  const { openGuideModal, isGuideModalOpen, closeGuideModal } =
    useGuideModalStore(store => store)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [value, setValue] = useState(1)

  const handleClick = () => {
    if (!isGuideModalOpen) {
      openGuideModal()

      const newParams = new URLSearchParams(searchParams)
      newParams.set('guideId', String(id))
      setSearchParams(newParams)
    } else {
      closeGuideModal()
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('guideId')
      setSearchParams(newParams)
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (values: GuideUpdatePayload) => updateGuide(id, values),
    onSuccess: () => {
      refetch?.()
    },
  })
  const reasons = [
    { id: 1, text: 'Content 1' },
    { id: 4, text: 'Другая причина' },
  ]

  const onChange = (e: RadioChangeEvent) => setValue(e.target.value)
  const handleComplain = () => {
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

    mutate({ guide_status: 'rejected', rejected_reason: reason })
    setReportModalOpen(false)
    closeGuideModal()
  }
  return (
    <div className="flex gap-2">
      {type === 'in_progress' ? (
        <div className="flex items-center gap-[10px]">
          {' '}
          <Button
            className="inline-flex items-center bg-[#CCFBF1] px-[10px] py-1"
            type="text"
            loading={isPending}
            onClick={() => mutate({ guide_status: 'accepted' })}
          >
            <CheckIcon />
          </Button>
          <Button
            className="inline-flex items-center bg-[#FEE2E2] px-[10px] py-1"
            type="text"
            onClick={() => {
              setReportModalOpen(true)
            }}
          >
            <CancelIcon />
          </Button>
        </div>
      ) : (
        ''
      )}
      <Button
        className="inline-flex items-center gap-2 font-medium text-primary"
        type="text"
        onClick={handleClick}
      >
        <EyeIcon className="text-xl" />
        {t('common.more-details')}
      </Button>
      <CustomModal
        width={641}
        open={reportModalOpen}
        onOk={() => setReportModalOpen(false)}
        onCancel={() => setReportModalOpen(false)}
      >
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
          <Radio.Group onChange={onChange} value={value} className="mb-8">
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
              onClick={() => setReportModalOpen(false)}
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
            >
              {t('guides.cancel')}
            </Button>
          </Flex>
        </Flex>
      </CustomModal>
    </div>
  )
}

export default memo(GuidesTableActionButton)
