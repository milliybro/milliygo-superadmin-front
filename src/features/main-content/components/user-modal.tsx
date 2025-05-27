import { useTranslation } from 'react-i18next'
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Typography,
  notification,
} from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import useUserModalStore from '../store/destinations-modal-store'

import CSelect from '@/components/ui/select'
import UserIcon from '@/components/icons/user'
import CloseIcon from '@/components/icons/close-icon'
import Edit2Icon from '@/components/icons/edit-2'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createUser, getUser, getUserRoles, updateUser } from '../api'
import { useEffect } from 'react'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import { IUsers } from '@/features/accommodation-facilities/types'
// import queryClient from '@/utils/query-client'

interface UserModalProps {
  refetch: () => Promise<any>
}

const UserModal = ({ refetch }: UserModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useUserModalStore(state => state)

  const [form] = Form.useForm()

  const editUserId = searchParams.get('edit')

  const closeHandler = () => {
    closeModal()

    if (editUserId) {
      navigate(pathname)
    }
  }

  const { data, refetch: fetching } = useQuery({
    queryKey: ['user', editUserId],
    queryFn: async () => {
      const res = await getUser({ id: editUserId })
      return res
    },
    enabled: !!editUserId,
  })

  const { data: roles, isLoading } = useQuery({
    queryKey: ['users-roles'],
    queryFn: async () => {
      const res = await getUserRoles()
      return res
    },
    // keepPreviousData: true,
  })

  const openNotification = () => {
    notification.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CheckmarkCircleIcon className="text-[24px] text-primary" />,
      message: (
        <Typography.Text className="text-[18px] font-semibold leading-[22.95px]">
          {editUserId
            ? t('fields.user-notification.edit.message')
            : t('fields.user-notification.add.message')}
        </Typography.Text>
      ),
      placement: 'topRight',
      description: (
        <div>
          <Button
            size="small"
            type="text"
            className="grid place-items-center rounded-lg absolute right-[10px] top-[10px]"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notification.destroy()}
          />
          <Typography.Text className="text-secondary text-base">
            {editUserId
              ? t('fields.user-notification.add.message')
              : t('fields.user-notification.edit.message')}
          </Typography.Text>
        </div>
      ),
    })
  }

  const { mutate: handleUserSave } = useMutation({
    mutationFn: (values: any) => {
      const formattedValues: IUsers = {
        ...values,
      }

      if (editUserId) {
        return updateUser({ id: editUserId, queryParams: formattedValues })
      }

      return createUser(formattedValues)
    },
    onSuccess: () => {
      // notification.success({
      //   message: editUserId
      //     ? t('fields.user-notification.edit.message')
      //     : t('fields.user-notification.add.message'),
      // })
      openNotification()
      form.resetFields()
      refetch()
      fetching()
      closeHandler()
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  useEffect(() => {
    if (editUserId) {
      refetch()
    }
  }, [editUserId, refetch])


  useEffect(() => {
    if (data && editUserId) {
      form.setFieldsValue({
        first_name: data?.first_name + ' ' + data?.last_name,
        phone: data?.phone,
        gender: data?.gender,
        username: data?.username,
        code: data?.code,
        type: data?.type?.name,
        status: data?.is_active,
      })
    }
  }, [data, form])

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
        onFinish={values => handleUserSave(values)}
        className="flex flex-col gap-4"
        form={form}
      >
        <Form.Item
          label={t('fields.fullname.label')}
          name="first_name"
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
          <Input
            className="select-shadow"
            placeholder={t('fields.phone.placeholder')}
          />
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
          <CSelect
            placeholder={t('fields.gender.placeholder')}
            className="select-shadow"
          >
            <Select.Option value="male">{t('common.men')}</Select.Option>
            <Select.Option value="female">{t('common.women')}</Select.Option>
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
          <Input
            className="select-shadow"
            placeholder={t('fields.login.placeholder')}
          />
        </Form.Item>
        {editUserId ? null : (
          <Form.Item
            label={t('fields.code.label')}
            name="password"
            rules={[
              {
                required: true,
                message: t('fields.code.validation-message-required'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.code.placeholder')}
            />
          </Form.Item>
        )}
        {/* <Form.Item
          label={t('fields.code.label')}
          name="code"
          rules={[
            {
              required: true,
              message: t('fields.code.validation-message-required'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('fields.code.placeholder')}
          />
        </Form.Item> */}

        <Form.Item
          label={t('fields.role.label')}
          name="type"
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
            loading={isLoading}
          >
            {roles?.results.map(role => (
              <Select.Option key={role.id} value={role.name}>
                {t(`common.${role.name}`)}
              </Select.Option>
            ))}
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
            <Select.Option value={true}>{t('common.active')}</Select.Option>
            <Select.Option value={false}>{t('common.inactive')}</Select.Option>
          </CSelect>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center gap-4">
            <Button onClick={closeHandler}>{t('common.cancel')}</Button>
            <Button type="primary" htmlType="submit">
              {editUserId
                ? t('users-page.edit-user')
                : t('users-page.add-user')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal
