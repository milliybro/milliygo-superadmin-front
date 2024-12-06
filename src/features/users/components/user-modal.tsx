import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Select, Button } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import useUserModalStore from '../store/user-modal-store'

import CSelect from '@/components/ui/select'
import UserIcon from '@/components/icons/user'
import CloseIcon from '@/components/icons/close-icon'
import Edit2Icon from '@/components/icons/edit-2'

const UserModal = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useUserModalStore(state => state)

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
          {editUserId ? (
            <Edit2Icon className="text-[24px] text-primary" />
          ) : (
            <UserIcon className="text-[24px] text-primary" />
          )}
        </div>
        <div className="text-[24px] mb-2 text-primary-dark font-bold">
          {editUserId ? t('users-page.edit-user') : t('users-page.add-user')}
        </div>
        <p className="text-secondary font-medium">
          {t('users-page.modal-description')}
        </p>
      </div>
      <Form
        layout="vertical"
        onFinish={values => {
          console.log('Form values:', values)
        }}
        className="flex flex-col gap-4"
      >
        <Form.Item
          label={t('fields.fullname.label')}
          name="fullname"
          rules={[
            {
              required: true,
              message: t('fields.fullname.validation-message-required'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('fields.fullname.placeholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('fields.phone.label')}
          name="phone"
          rules={[
            {
              required: true,
              message: t('fields.phone.validation-message-required'),
            },
          ]}
        >
          <Input className="select-shadow" placeholder="+998 90 857 74 09" />
        </Form.Item>

        <Form.Item
          label={t('fields.gender.label')}
          name="gender"
          rules={[
            {
              required: true,
              message: t('fields.gender.validation-message-required'),
            },
          ]}
        >
          <CSelect placeholder="Мужчина" className="select-shadow">
            <Select.Option value="male">Мужчина</Select.Option>
            <Select.Option value="female">Женщина</Select.Option>
          </CSelect>
        </Form.Item>

        <Form.Item
          label={t('fields.login.label')}
          name="username"
          rules={[
            {
              required: true,
              message: t('fields.login.validation-message-required'),
            },
          ]}
        >
          <Input className="select-shadow" placeholder="crazyelephant681" />
        </Form.Item>

        <Form.Item
          label={t('fields.code.label')}
          name="code"
          rules={[
            {
              required: true,
              message: t('fields.code.validation-message-required'),
            },
          ]}
        >
          <Input className="select-shadow" placeholder="594" />
        </Form.Item>

        <Form.Item
          label={t('fields.role.label')}
          name="role"
          rules={[
            {
              required: true,
              message: t('fields.role.validation-message-required'),
            },
          ]}
        >
          <CSelect
            className="select-shadow"
            placeholder={t('fields.role.validation-message-required')}
          >
            <Select.Option value="admin">Администратор</Select.Option>
            <Select.Option value="user">Пользователь</Select.Option>
          </CSelect>
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
              {t('users-page.add-user')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal
