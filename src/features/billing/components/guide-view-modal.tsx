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

import useHotelModalStore from '../store/hotel-modal-store'

import CloseIcon from '@/components/icons/close-icon'
import { useState } from 'react'
import UserIcon from '@/components/icons/user'
import DownloadIcon from '@/components/icons/download-icon'
import CustomModal from './custom-madal'
import { RadioChangeEvent } from 'antd/lib'

const GuideViewModal = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useHotelModalStore(state => state)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [value, setValue] = useState(1)

  const editTenantId = searchParams.get('edit')

  const closeHandler = () => {
    form.resetFields()
    closeModal()

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
    closeModal()
  }

  return (
    <>
      <Modal
        title={null}
        open={isModalOpen}
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
        <div className="flex items-center mb-6 flex-col text-center justify-center">
          <div
            className="bg-[#DBEAFE] border-[8px] mb-4 border-[#EFF6FF] shrink-0 flex items-center justify-center
           size-[62px] rounded-full"
          >
            <UserIcon className="text-[24px] text-primary" />
          </div>
          <div className="text-[24px] mb-2 text-primary-dark font-bold">
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

          <div className="flex justify-between items-center mt-1">
            <Typography.Text className="text-[14px] font-[400]">
              Лицензия
            </Typography.Text>
            <Button className="bg-[#3276FF33] h-[28px] px-2 py-0 flex items-center">
              <DownloadIcon className="" />
              <Typography.Text className="text-[#2563EB] text-[14px] font-[500] ml-1">
                Скачать
              </Typography.Text>
            </Button>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-9">
          <Button
            className="text-[#991B1B] text-white bg-[#FCA5A5]"
            onClick={() => {
              setReportModalOpen(true)
            }}
          >
            Отклонить
          </Button>
          <Button className="bg-[#4DD282] text-white">Принимать</Button>
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
              <div className="h-20 w-20 bg-[#F8F8FA] rounded-[24px] flex justify-center items-center">
                {/* <BigCancelIcon /> */}
              </div>
              <Typography.Title level={2} className="">
                Хотите отклонить заявку?
              </Typography.Title>
            </Flex>
            <Typography.Text className="text-[#777E90] text-[16px] font-[400] mb-6">
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
                  className="h-[122px] resize-none p-4 mb-6"
                  placeholder="Принича"
                />
              </Form.Item>
            </Form>
          )}

          <Flex gap={32}>
            <Button
              aria-label={t('buttons.cancel')}
              className="border-none flex-1 font-medium bg-secondary-light"
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
              className="text-white flex-1"
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
