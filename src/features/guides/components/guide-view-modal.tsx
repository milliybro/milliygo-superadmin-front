import { useTranslation } from 'react-i18next'
import {
  Modal,
  Form,
  Input,
  Button,
  Typography,
  Flex,
  Radio,
  Space,
} from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import useGuideModalStore from '../store/hotel-modal-store'

import CloseIcon from '@/components/icons/close-icon'
import { useState } from 'react'
import UserIcon from '@/components/icons/user'
import DownloadIcon from '@/components/icons/download-icon'
import CustomModal from './custom-madal'
import { RadioChangeEvent } from 'antd/lib'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getGuide, updateGuide } from '../api'

type GuideUpdatePayload = {
  guide_status: 'accepted' | 'rejected'
  rejected_reason?: string
}

const GuideViewModal = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const { isGuideModalOpen, closeGuideModal } = useGuideModalStore(
    state => state,
  )
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [value, setValue] = useState(1)
  const guideId = searchParams.get('guideId')
  const queryClient = useQueryClient()
  const editTenantId = searchParams.get('edit')

  const closeHandler = () => {
    form.resetFields()
    closeGuideModal()

    if (editTenantId) {
      navigate(pathname)
    }
  }

  const reasons = [
    { id: 1, text: 'Content 1' },
    { id: 4, text: t('guides.add-reason') },
  ]

  const onChange = (e: RadioChangeEvent) => setValue(e.target.value)

  const { mutate, isPending } = useMutation({
    mutationFn: (values: GuideUpdatePayload) =>
      updateGuide(guideId as any, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guides-data'] })
    },
  })
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

  console.log(guideId)

  const { data } = useQuery({
    queryKey: ['guide', guideId],
    queryFn: async () => {
      if (!guideId) return null
      const res = await getGuide(Number(guideId))
      return res
    },
    enabled: !!guideId,
  })
  console.log(data)

  return (
    <>
      <Modal
        title={null}
        open={isGuideModalOpen}
        onCancel={closeHandler}
        closable={false}
        centered
        closeIcon={null}
        classNames={{
          wrapper: 'backdrop-blur-sm',
          content:
            '!p-[40px] [&>.ant-modal-close]:text-primary-dark dark:[&>.ant-modal-close]:text-dark-bg',
        }}
        footer={null}
      >
        <Button
          className="absolute right-[10px] top-[10px]"
          type="text"
          icon={<CloseIcon className="text-base" />}
          onClick={closeHandler}
        />
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-[62px] shrink-0 items-center justify-center rounded-full border-[8px] border-[#EFF6FF] bg-[#DBEAFE]">
            <UserIcon className="text-2xl text-primary" />
          </div>
          <div className="mb-2 text-2xl font-bold text-primary-dark">
            {t('guides.info-guide')}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { label: t('hotel-guest.lfm'), value: data?.full_name },
            {
              label: t('hotel-guest.citizenship'),
              value: data?.citizenship_name,
            },
            { label: t('hotel-guest.nation'), value: data?.nationality_name },
            { label: t('hotel-guest.birth'), value: '' },
            { label: t('hotel-guest.gender'), value: '' },
            { label: t('hotel-guest.phone'), value: data?.phone },
          ].map((item, i) => (
            <div key={i} className="flex justify-between">
              <Typography.Text className="text-sm font-[400]">
                {item.label}
              </Typography.Text>
              <Typography.Text className="text-sm font-[500]">
                {item.value}
              </Typography.Text>
            </div>
          ))}

          <div className="mt-1 flex items-center justify-between">
            <Typography.Text className="text-sm font-[400]">
              {t('guides.license')}
            </Typography.Text>
            <Button
              className="flex h-[28px] items-center bg-[#3276FF33] px-2 py-0"
              onClick={() => {
                if (!data?.certificate_file) return
                const link = document.createElement('a')
                link.href = data.certificate_file
                link.download =
                  data.certificate_file.split('/').pop() || 'certificate.pdf'
                link.target = '_blank'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              <DownloadIcon className="" />
              <Typography.Text className="ml-1 text-sm font-[500] text-[#2563EB]">
                {t('guides.download')}
              </Typography.Text>
            </Button>
          </div>
        </div>
        <div className="mt-9 flex justify-center gap-4">
          <Button
            className="border border-[#991B1B] bg-[#FCA5A5] font-[600] text-[#991B1B]"
            onClick={() => {
              setReportModalOpen(true)
            }}
          >
            {t('guides.cancel')}
          </Button>
          <Button
            className="border border-[#4DD282] bg-[#4DD282] font-[600] text-white"
            loading={isPending}
            onClick={() => mutate({ guide_status: 'accepted' })}
          >
            {t('guides.apply')}
          </Button>
        </div>
      </Modal>
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
            <Typography.Text className="mb-6 text-base font-[400] text-[#777E90]">
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
    </>
  )
}

export default GuideViewModal
