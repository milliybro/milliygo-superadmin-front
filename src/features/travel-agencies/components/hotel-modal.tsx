import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Select, Button, DatePicker } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import useHotelModalStore from '../store/hotel-modal-store'

import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import HotelIcon from '@/components/icons/hotel'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

const HotelsModal = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useHotelModalStore(state => state)

  const editUserId = searchParams.get('edit')

  const closeHandler = () => {
    closeModal()

    if (editUserId) {
      navigate(pathname)
    }
  }

  return (
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
          <HotelIcon className="text-[24px] text-primary" />
        </div>
        <div className="text-[24px] mb-2 text-primary-dark font-bold">
          {t('hotels-page.add-hotel')}
        </div>
        <p className="text-secondary font-medium">
          {t('hotels-page.add-hotel-desc')}
        </p>
      </div>
      <Form
        layout="vertical"
        className="flex flex-col gap-4"
      >
        <Form.Item
          label={t('hotels-page.name.title')}
          name="name"
          rules={[
            {
              required: true,
              message: t('hotels-page.name.placeholder'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('hotels-page.name.placeholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('hotels-page.login.title')}
          name="login"
          rules={[
            {
              required: true,
              message: t('hotels-page.login.placeholder'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('hotels-page.login.placeholder')}
          />
        </Form.Item>
        <Form.Item
          label={t('hotels-page.password.title')}
          name="password"
          rules={[
            {
              required: true,
              message: t('hotels-page.password.placeholder'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('hotels-page.password.placeholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('hotels-page.domen.title')}
          name="domen"
          rules={[
            {
              required: true,
              message: t('hotels-page.domen.placeholder'),
            },
          ]}
        >
          <Input
            addonAfter="em.xdevs.uz"
            className="select-shadow"
            placeholder={t('hotels-page.domen.placeholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('hotels-page.period')}
          name="role"
          rules={[
            {
              required: true,
              message: t('fields.role.validation-message-required'),
            },
          ]}
        >
          <RangePicker
            defaultValue={[
              dayjs('2024-12-18', 'YYYY-MM-DD'),
              dayjs('2024-12-18', 'YYYY-MM-DD'),
            ]}
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label={t('fields.status.label')}
          name="status"
          rules={[
            {
              required: true,
              message: t('fields.status.validation-message-required'),
            },
          ]}
        >
          <CSelect
            className="select-shadow"
            placeholder={t('fields.status.placeholder')}
          >
            <Select.Option value="active">Активный</Select.Option>
            <Select.Option value="inactive">Неактивный</Select.Option>
          </CSelect>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center gap-4">
            <Button onClick={closeHandler}>{t('common.cancel')}</Button>
            <Button type="primary" htmlType="submit" onClick={closeHandler}>
              {t('hotels-page.add-hotel')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default HotelsModal
