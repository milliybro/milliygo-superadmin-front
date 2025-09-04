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
import { useQuery } from '@tanstack/react-query'
import { getGuide } from '../api'

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
    { id: 4, text: 'Другая причина' },
  ]

  const onChange = (e: RadioChangeEvent) => setValue(e.target.value)

  const handleComplain = () => {
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
          icon={<CloseIcon className="text-[16px]" />}
          onClick={closeHandler}
        />
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-[62px] shrink-0 items-center justify-center rounded-full border-[8px] border-[#EFF6FF] bg-[#DBEAFE]">
            <UserIcon className="text-[24px] text-primary" />
          </div>
          <div className="mb-2 text-[24px] font-bold text-primary-dark">
            Информация о гиде
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { label: 'ФИО', value: 'Alisher Makhmudov' },
            { label: 'Гражданство', value: 'Узбекистан' },
            { label: 'Нации', value: 'Узбек' },
            { label: 'День рождения', value: '21.05.1990' },
            { label: 'Пол', value: 'Мужчина' },
            { label: 'Номер телефон', value: '+998 97 456 123 78' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between">
              <Typography.Text className="text-[14px] font-[400]">
                {item.label}
              </Typography.Text>
              <Typography.Text className="text-[14px] font-[500]">
                {item.value}
              </Typography.Text>
            </div>
          ))}

          <div className="mt-1 flex items-center justify-between">
            <Typography.Text className="text-[14px] font-[400]">
              Лицензия
            </Typography.Text>
            <Button className="flex h-[28px] items-center bg-[#3276FF33] px-2 py-0">
              <DownloadIcon className="" />
              <Typography.Text className="ml-1 text-[14px] font-[500] text-[#2563EB]">
                Скачать
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
            Отклонить
          </Button>
          <Button className="border border-[#4DD282] bg-[#4DD282] font-[600] text-white">
            Принимать
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
                Хотите отклонить заявку?
              </Typography.Title>
            </Flex>
            <Typography.Text className="mb-6 text-[16px] font-[400] text-[#777E90]">
              Выберите причину отклонения из нижеперечисленных вариантов.
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
                label="Опишите причину"
                rules={[
                  { required: true, message: 'Пожалуйста, введите детали.' },
                ]}
              >
                <Input.TextArea
                  className="mb-6 h-[122px] resize-none p-4"
                  placeholder="Принича"
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
              Отмена
            </Button>
            <Button
              aria-label={t('complain.complain')}
              size="large"
              type="primary"
              danger
              className="flex-1 text-white"
              onClick={handleComplain}
            >
              Отклонить
            </Button>
          </Flex>
        </Flex>
      </CustomModal>
    </>
  )
}

export default GuideViewModal
